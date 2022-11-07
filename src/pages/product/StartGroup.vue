<template>
  <div class="group-page" v-if="productDetail">

    <div style="display: flex;justify-content: space-between;margin-left: 0.5rem;margin-right: 0.5rem">

      <div style="display: flex;flex-direction: column;width: 60%;">
        <div style="display: flex;align-items: center;margin-top: 0.2rem;">
          <p class="main-title">Product Name:</p>
          <p class="main-text" style="margin-left: 0.2rem;">{{productDetail.goodsTitle}}</p>
        </div>

        <div style="display: flex;align-items: center;margin-top: 0.2rem;" v-if="true">
          <p class="main-title">Product Introduction:</p>
          <p class="main-text" style="margin-left: 0.2rem;">{{productDetail.goodsIntro}}</p>
        </div>

        <div style="display: flex;margin-top: 0.2rem;">
          <p class="main-title">Product Description:</p>
          <p class="main-text" style="margin-left: 0.2rem;margin-top: 0.04rem">{{productDetail.goodsDetailsIntro}}</p>
        </div>
      </div>

      <img
          class="product-image"
          :src="productImage0"
          alt=""/>
    </div>

    <div style="display: flex;margin-left: 0.5rem;margin-right: 0.5rem;flex-direction: column">

      <div style="display: flex;flex-direction: column;width: 60%;margin-top: 0.2rem;">
        <p class="main-title">Group Setting:</p>
        <div class="content-section">
          <div class="form">
            <span class="label">Group Price:</span><span class="value">￥{{productDetail.grouponRulesDto.price}}</span>
          </div>
          <div class="form">
            <span class="label">Minimum Members:</span><span class="value">{{productDetail.grouponRulesDto.participantsMin}}</span>
          </div>
          <div class="form">
            <span class="label">Maximum Members:</span><span class="value">{{productDetail.grouponRulesDto.participantsMax}}</span>
          </div>
          <div class="form">
            <span class="label">Group validity period(day):</span><span class="value">{{productDetail.grouponRulesDto.expirationDay}} Day</span>
          </div>
          <div class="form">
            <span class="label">Organizer Reward:</span><span class="value">{{decimalToPercentage(productDetail.grouponRulesDto.ownerRewardRatio)}}</span>
          </div>
          <div class="form">
            <span class="label">Member Reward:</span><span class="value">{{decimalToPercentage(productDetail.grouponRulesDto.memberRewardRatio)}}</span>
          </div>
<!--          <div class="form">-->
<!--            <div class="label">团员奖励比例:</div>-->
<!--            <el-input style="margin-right: 0.1rem;width: auto;flex: 1 1 auto;margin-left: 0.1rem;" type="number"-->
<!--                      v-model="groupReward" placeholder="团员总奖励占总利润额的百分比，由团长支付"></el-input>-->
<!--          </div>-->
          <div class="form">
            <span class="label">Total Blind Box Reward CCP:</span><span class="value">{{productDetail.grouponRulesDto.blindBoxTotalRewardAmount}}</span>
          </div>
          <p style="margin-top:0.05rem;margin-left: 1.6rem; font-size: 0.12rem;color: #7A798A;line-height: 0.15rem;">*Blind box rewards CCP to be paid from the platform foundation, without the need for merchants to bear.</p>
        </div>
      </div>

      <div style="display: flex;flex-direction: column;width: 60%;margin-top: 0.2rem;">
        <p class="main-title">Group haggling rules:</p>

        <div class="content-section">
          <div class="form">
            <span class="label">Haggling amount range:</span><span class="value">￥{{productDetail.grouponRulesDto.haggleMinAmount}} ~ ￥{{productDetail.grouponRulesDto.haggleMaxAmount}}</span>
          </div>
          <div class="form">
            <span class="label">CCP reward to haggler:</span><span class="value">{{productDetail.grouponRulesDto.haggleRewardAmount}}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="false" style="margin-left: 0.5rem">
      <p class="main-title" style="margin-top: 0.3rem;">Group NFT:</p>
      <el-upload
          class="upload-section"
          ref="upload"
          list-type="picture-card"
          action
          :file-list="fileList"
          :on-change="onFileChange"
          :on-remove="onFileChange"
          :http-request="httpRequest"
          :before-upload="beforeUpload"
          :limit="10">
        <i class="el-icon-plus upload-icon" style=""></i>
      </el-upload>
      <p style="margin-top:0.05rem; font-size: 0.12rem;color: #7A798A;line-height: 0.15rem;">
        *Upload up to 10 product images. After the product images are released, the platform will mint NFT assets, and the on-chain minting fee will be subsidized by the platform.</p>
    </div>
    <el-checkbox v-model="checked" style="margin-top: 0.2rem;margin-left: 0.5rem;">Accept group buying and haggling rules</el-checkbox>

    <div class="buy-button" :class="{'disable':!checked}" @click="publishGroup">Start</div>
  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {publishGroupTask} from "@/api";
import {number_util} from "@/mixins/mixin";
import {Loading} from "element-ui";

export default {
  name: "StartGroup",
  mixins: [number_util],
  data() {
    return {
      groupReward: "",
      fileList: [],
      checked: true,
      taskId:"",
      productDetail:null,
      productImage0:"",
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.taskId = this.$route.query.taskId
    this.productDetail = JSON.parse(sessionStorage.getItem(this.taskId))
    this.productImages = JSON.parse(this.productDetail.goodsImageJson)
    this.productImage0 = this.productImages.file0;
  },
  methods: {
    onFileChange(file, fileList) {
      console.log("onFileChange fileList", fileList);
      this.fileList = fileList;
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
    publishGroup(){
      let formData = new FormData();
      formData.append('taskParentId', this.taskId)

      let type = "group";
      if (this.fileList && this.fileList.length){
        type = "nft"
        formData.append('enableNft', true)
        this.fileList.forEach((file) => {
          formData.append('nft_'+file.name, file.raw)
        });
      }

      this.showCustomLoading(type)

      publishGroupTask(formData).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res){
          this.$router.replace({path: "/user/mission"}).catch(()=>{});
        }
        this.hideCustomLoading()
      }).catch(error => {
        this.hideCustomLoading();
        console.log("error",error)
      })
    },
    showCustomLoading(type){
      let text = type === "nft"?"NFT minting...":"Group information is being released..."
      this.customLoading = Loading.service(
          {
            fullscreen: true,
            spinner:"nft-spinner",
            text:text,
            customClass:"custom-nft-spinner"
          }
      )
    },
    hideCustomLoading(){
      if (this.customLoading){
        // 以服务的方式调用的 Loading 需要异步关闭
        this.$nextTick(() => {
          this.customLoading.close();
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.group-page {
  display: flex;
  flex-direction: column;
  padding-top: 0.8rem;
  padding-bottom: 1.5rem;
  width: 12rem;
  margin: 0 auto;

  .main-title {
    font-size: 0.18rem;
    font-weight: 500;
    color: #1F1F2C;
    line-height: 0.25rem;
    flex-shrink:0;
  }

  .main-text {
    font-size: 0.14rem;
    font-weight: 500;
    color: #7A798A;
    line-height: 0.18rem;
  }

  .product-image {
    width: 2rem;
    height: 2rem;
    background: #EBEBEB;
    border-radius: 0.2rem;
    object-fit: cover;
    margin-top: 0.2rem;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
    border-radius: 0.08rem;
    padding-left: 0.2rem;
    padding-bottom: 0.12rem;
    margin-top: 0.2rem;

    .form {
      display: flex;
      align-items: center;
      margin-top: 0.12rem;


      .label {
        font-size: 0.15rem;
        font-weight: 400;
        color: #7A798A;
        line-height: 0.22rem;
        width: 1.5rem;
        text-align: right;
      }

      .value {
        margin-left: 0.1rem;
        font-size: 0.15rem;
        font-weight: bold;
        color: #1F1F2C;
        line-height: 0.22rem;
      }
    }
  }

  .upload-section {
    height: 1rem;
    margin-top: 0.2rem;

    .upload-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .buy-button {
    width: 40%;
    margin: 0.5rem auto;
    height: 0.4rem;
    border-radius: 0.56rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 0.14rem;
    color: #FFFFFF;
    cursor: pointer;
    background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);

    &.disable{
      background: linear-gradient(140deg, #BBBBBB 0%, #BBBBBB 100%);
    }
  }

  //input配置
  ::v-deep(.el-input__inner) {
    padding: 0 0.1rem;
    height: 0.35rem;
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

  //upload配置
  ::v-deep(.el-upload--picture-card) {
    position: relative;
    width: 1rem;
    height: 1rem;
  }

  ::v-deep(.el-upload--picture-card:hover) {
    border: 1px dashed #007CFF;
  }

  ::v-deep(.el-upload-list__item) {
    width: 1rem;
    height: 1rem;
    transition: none !important;
  }


  //checkbox配置
  ::v-deep(.el-checkbox__label) {
    color: #7A798A;
    font-weight: 400;
    font-size: 0.14rem;
  }

  ::v-deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: #007CFF;
  }

  ::v-deep(.el-checkbox__inner) {
    border-color: #007CFF;
  }

  ::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    border-color: #007CFF;
    background-color: #007CFF;
  }

  ::v-deep(.el-checkbox__input.is-focus .el-checkbox__inner) {
    border-color: #007CFF;
  }

}
</style>
