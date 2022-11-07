<template>
  <page-dialog dialogWidth="480px" :dialogShow="dialogShow" @close="dialogClose">
    <template v-slot:dialog-header>
      <div>Create Proposal</div>
    </template>
    <template v-slot:dialog-body>
      <div class="create-proposal-dialog-body">

        <div class="form">
          <span class="label">Title:</span>
          <el-input class="main-input" v-model="proposalTitle" placeholder="Please enter the proposal title"></el-input>
        </div>

        <div class="form">
          <span class="label">Content:</span>
          <el-input class="main-input" v-model="proposalContext" placeholder="Please enter the proposal content"></el-input>
        </div>

        <div class="form">
          <span class="label">End Time:</span>
          <el-date-picker
              class="main-input"
              v-model="proposalEndTime"
              type="datetime"
              value-format="timestamp"
              placeholder="Select end time">
          </el-date-picker>
        </div>

        <div class="form">
          <span class="label">Proposal File:</span>
          <el-upload
              class="upload-section"
              ref="upload"
              list-type="picture-card"
              action
              :file-list="nftFileList"
              :on-change="onNFTFileChange"
              :on-remove="onNFTFileChange"
              :http-request="httpRequest"
              :before-upload="beforeUpload"
              :limit="1">
            <i class="el-icon-plus upload-icon" style=""></i>
          </el-upload>
        </div>

        <div class="button-section">
          <div class="button cancel" @click="dialogClose">Cancel</div>
          <div class="button confirm" @click="confirm">Confirm</div>
        </div>
      </div>
    </template>
  </page-dialog>
</template>

<script>
import PageDialog from "@/components/PageDialog.vue";
import {getCurrentTimeStamp} from "@/utils";
import {createDaoProposal} from "@/api";
import qs from "qs";

export default {
  name: "CreateProposal",
  props: ["dialogShow","daoNo"],
  components: {
    PageDialog
  },
  data(){
    return{
      proposalTitle:"",
      proposalContext:"",
      proposalEndTime:"",
      nftFileList:[],
    }
  },
  methods: {
    dialogClose() {
      this.$emit("close");
    },
    confirm() {
      this.createProposal();
    },
    httpRequest(option) {
      // console.log("option == "+JSON.stringify(option))
    },
    beforeUpload(file) {
      let fileSize = file.size
      const FIVE_M = 3 * 1024 * 1024;
      //大于5M，不允许上传
      if (fileSize > FIVE_M) {
        this.$message.error("最大上传3M")
        return false
      }
      //判断文件类型
      let fileName = file.name
      let pngReg = /^.+(\.png)$/
      let jpgReg = /^.+(\.jpg)$/
      let jpegReg = /^.+(\.jpeg)$/
      if (!pngReg.test(fileName) && !jpgReg.test(fileName) && !jpegReg.test(fileName)) {
        this.$message.error("目前只支持png、jpg、jpeg")
        return false
      }
      return true
    },
    onNFTFileChange(file, fileList) {
      console.log("onNFTFileChange fileList", fileList);
      this.nftFileList = fileList;
    },
    createProposal(){
      let proposalTitle = this.proposalTitle;
      let proposalContext = this.proposalContext;
      let proposalStartTime = getCurrentTimeStamp();
      let proposalEndTime = this.proposalEndTime;

      let formData = new FormData();
      formData.append("daoNo", ""+this.daoNo)
      formData.append("optionType", "0")
      formData.append("proposalTitle", proposalTitle)
      formData.append("proposalContext", proposalContext)
      formData.append("proposalStartTime", ""+proposalStartTime)
      formData.append("proposalEndTime", ""+proposalEndTime)
      formData.append("optionList", JSON.stringify([{"optionCode": "yes", "optionName": "YES"},{"optionCode": "no", "optionName": "NO"}]))

      if (this.nftFileList && this.nftFileList.length){
        this.nftFileList.forEach((file) => {
          formData.append('nft_'+file.name, file.raw)
        });
      }

      createDaoProposal(formData).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res && res.returnCode === "0000"){
          this.$emit("onSuccess");
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.create-proposal-dialog-body{
  display: flex;
  flex-direction: column;

  .main-content {
    font-size: 0.16rem;
    font-weight: 400;
    color: #58606A;
    line-height: 0.18rem;
  }

  .form {
    display: flex;
    align-items: center;
    margin-top: 0.12rem;

    .main-input{
      width: auto;
      flex: 1 1 auto;
      margin-left: 0.2rem;
    }


    .label {
      font-size: 0.15rem;
      font-weight: 400;
      color: #7A798A;
      width: 1rem;
      line-height: 0.22rem;
      text-align: right;
    }

    .value {
      margin-left: 0.1rem;
      font-size: 0.15rem;
      font-weight: bold;
      color: #1F1F2C;
      line-height: 0.22rem;
    }

    .upload-section {
      height: 0.5rem;
      margin-left: 0.2rem;
      .upload-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .button-section{
    width: 100%;
    margin-top: 0.25rem;
    height: 0.4rem;
    display: flex;

    .button{
      width: 100%;
      height: 100%;
      border-radius: 0.56rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 0.14rem;
      color: #FFFFFF;
      cursor: pointer;

      &.confirm{
        background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);
        margin-left: 0.2rem;
      }

      &.cancel{
        background: linear-gradient(313deg, #0F7BFF 0%, #5995DF 100%);
      }
    }
  }
}

::v-deep(.el-input__inner) {
  padding: 0 0.1rem;
  height: 0.35rem;
  line-height: 0.35rem;
}
::v-deep(.el-input__icon) {
  line-height: 0.35rem;
}
::v-deep(input::-webkit-outer-spin-button),
::v-deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none !important;
}
::v-deep(input[type="number"]) {
  -moz-appearance: textfield;
}
::v-deep(.el-input__inner:focus) {
  // el-input输入时设置边框颜色
  border: #007CFF 1px solid;
}
::v-deep(.el-textarea__inner:focus) {
  // el-input输入时设置边框颜色
  border: #007CFF 1px solid;
}

//upload配置
::v-deep(.el-upload--picture-card) {
  position: relative;
  width: 0.5rem!important;
  height: 0.5rem!important;
}

::v-deep(.el-upload--picture-card:hover) {
  border: 1px dashed #007CFF;
}

::v-deep(.el-upload-list__item) {
  width: 0.5rem!important;
  height: 0.5rem!important;
  transition: none !important;
}
</style>
