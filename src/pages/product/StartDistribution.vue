<template>

  <div class="distribution-page">

    <div style="display: flex;justify-content: space-between;margin-left: 0.5rem;margin-right: 0.5rem" v-if="productDetail">

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

    <div style="margin-left: 0.5rem">
      <p class="main-title" style="margin-top: 0.3rem;">Product Images:</p>
      <el-upload
          class="upload-section"
          ref="upload"
          list-type="picture-card"
          action
          :file-list="productFileList"
          :on-change="onProductFileChange"
          :on-remove="onProductFileChange"
          :http-request="httpRequest"
          :before-upload="beforeUpload"
          :limit="10">
        <i class="el-icon-plus upload-icon" style=""></i>
      </el-upload>
      <p style="margin-top:0.05rem; font-size: 0.12rem;color: #7A798A;line-height: 0.15rem;">
        *Upload up to 10 product images.</p>
    </div>

    <div style="display: flex;margin-left: 0.5rem;margin-right: 0.5rem;flex-direction: column">

      <div style="display: flex;flex-direction: column;width: 60%;margin-top: 0.2rem;">
        <p class="main-title">Price Setting:</p>
        <div class="content-section">
          <div class="form">
            <span class="label">Market Price:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.goodsPrice" placeholder="Please enter the market price" @mousewheel.native.prevent></el-input>
          </div>

          <div class="form">
            <span class="label">Sale Price:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.goodsSalePrice" placeholder="Please enter the sale price" @mousewheel.native.prevent></el-input>
          </div>
        </div>
      </div>

      <div v-if="false" style="display: flex;flex-direction: column;width: 60%;margin-top: 0.2rem;">
        <p class="main-title">Group Setting:</p>
        <div class="content-section">
          <div class="form">
            <span class="label">Group Price:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.price" placeholder="Please enter the group price" @mousewheel.native.prevent></el-input>
          </div>

          <div class="form">
            <span class="label">Minimum Members:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.participantsMin" placeholder="Please enter the minimum members amount" @mousewheel.native.prevent></el-input>
          </div>

          <div class="form">
            <span class="label">Maximum Members:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.participantsMax" placeholder="Please enter the maximum members amount" @mousewheel.native.prevent></el-input>
          </div>

          <div class="form">
            <span class="label">Organizer Reward:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.ownerRewardRatio" placeholder="Please enter the organizer reward percentage" @mousewheel.native.prevent></el-input>
          </div>
          <p style="margin-top:0.05rem;margin-left:1.75rem; font-size: 0.12rem;color: #7A798A;line-height: 0.15rem;">*After the group purchase link is clicked to join the group, the group organizer can get the opportunity to draw a blind box</p>

          <div class="form">
            <span class="label">Group validity period(day):</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.expirationDay" placeholder="Please enter the group validity period" @mousewheel.native.prevent></el-input>
          </div>

          <div class="form">
            <span class="label">Total Blind Box Reward CCP:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.blindBoxTotalRewardAmount" placeholder="Maximum 10000" @mousewheel.native.prevent></el-input>
          </div>
          <p style="margin-top:0.05rem;margin-left:1.75rem; font-size: 0.12rem;color: #7A798A;line-height: 0.15rem;">*Blind box rewards CCP to be paid from the platform foundation, without the need for merchants to bear.</p>
        </div>
      </div>

      <div v-if="false" style="display: flex;flex-direction: column;width: 60%;margin-top: 0.2rem;">
        <p class="main-title">Group haggling rules:</p>

        <div class="content-section">
          <div class="form">
            <span class="label">Haggling amount range:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.haggleMinAmount" placeholder="Minimum amount" @mousewheel.native.prevent></el-input>
            <span class="value"> ~ </span>
            <el-input class="main-input" type="number" v-model="distributionFrom.haggleMaxAmount" placeholder="Maximum amount" @mousewheel.native.prevent></el-input>
          </div>
          <div class="form">
            <span class="label">CCP reward to haggler:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.haggleRewardAmount" placeholder="CCP reward to haggler" @mousewheel.native.prevent></el-input>
          </div>
        </div>
      </div>

      <div style="display: flex;flex-direction: column;width: 60%;margin-top: 0.4rem;">
        <p class="main-title">Distribution Rules Setting:</p>
        <div class="content-section">
          <div class="form">
            <span class="label">Minimum Distribution Quantity:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.distributionMin" placeholder="Please enter the minimum distribution quantity" @mousewheel.native.prevent></el-input>
          </div>
          <div class="form">
            <span class="label">Distribution Price:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.distributionPrice" placeholder="Please enter the distribution price" @mousewheel.native.prevent></el-input>
          </div>
          <div class="form">
            <span class="label">Pledge Amount:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.pledgeAmount" placeholder="Please enter the pledge amount" @mousewheel.native.prevent></el-input>
          </div>
          <div class="form">
            <span class="label">Distribution Reward Percentage:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.distributionRewardRatio" placeholder="Please enter the distribution reward percentage" @mousewheel.native.prevent></el-input>
          </div>
          <div class="form">
            <span class="label">Unfinished Punishment:</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.penaltyRatio" placeholder="Please enter the unfinished punishment percentage" @mousewheel.native.prevent></el-input>
          </div>
          <div class="form">
            <span class="label">Task Validity Period(day):</span>
            <el-input class="main-input" type="number" v-model="distributionFrom.distributionExpirationDay" placeholder="Please enter the task validity period" @mousewheel.native.prevent></el-input>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-left: 0.5rem" v-if="false">
      <p class="main-title" style="margin-top: 0.3rem;">Distribution task NFT:</p>
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
          :limit="10">
        <i class="el-icon-plus upload-icon" style=""></i>
      </el-upload>
      <p style="margin-top:0.05rem; font-size: 0.12rem;color: #7A798A;line-height: 0.15rem;">
        *Upload up to 10 product images. After the product images are released, the platform will mint NFT assets, and the on-chain minting fee will be subsidized by the platform.</p>
    </div>

    <el-checkbox v-model="checked" style="margin-top: 0.2rem;margin-left: 0.5rem;">Accept the distribution rules and agree to pledge CCP equivalent to ${{distributionPledgeAmount}} as a deposit. Understand the rules of group buying and cutting a knife set by yourself.</el-checkbox>

    <div class="buy-button" :class="{'enable':checked && formValid && imageValid}" @click="rulesConfirm()">Pledge and initiate distribution tasks</div>

    <RulesConfirmDialog
        :dialogShow="rulesConfirmDialogShow"
        :groupRules="groupRules"
        :distributionRules="distributionRules"
        @close="rulesConfirmDialogShow = false"
        @confirm="publishDistribution()"
    ></RulesConfirmDialog>
  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {publishDistributionTask} from "@/api";
import {string_util} from "@/mixins/mixin";
import RulesConfirmDialog from "./RulesConfirmDialog.vue";
import {Loading} from "element-ui";

export default {
  name: "StartDistribution",
  mixins: [string_util],
  components: {
    RulesConfirmDialog,
  },
  data(){
    return{
      rulesConfirmDialogShow:false,
      groupRules:"",
      distributionRules:"",
      productDetail:null,
      productImage0:"",
      productFileList: [],
      nftFileList: [],
      checked: true,
      formValid: false,
      imageValid: false,
      distributionPledgeAmount:"0",

      distributionFrom:{
        goodsPrice:"",
        goodsSalePrice:"",

        price:"",
        participantsMin:"",
        participantsMax:"",
        ownerRewardRatio: "",
        blindBoxTotalRewardAmount: "",
        expirationDay: "",
        haggleMinAmount: "",
        haggleMaxAmount: "",
        haggleRewardAmount: "",

        distributionMin:"",
        distributionPrice:"",
        pledgeAmount:"",
        distributionRewardRatio:"",
        penaltyRatio:"",
        distributionExpirationDay:"",
      },
    }
  },
  watch:{
    distributionFrom:{
      handler(val){
        this.formValid = true
        Object.keys(val).forEach((key) => {
          // console.log(key, val[key])
          if (this.isStrEmpty(val[key])){
            this.formValid = false
          }
        })
      },
      deep:true
    },
    productFileList:{
      handler(val){
        this.imageValid = val && val.length
      },
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.taskId = this.$route.query.taskId
    this.productDetail = JSON.parse(sessionStorage.getItem(this.taskId))
    this.productImages = JSON.parse(this.productDetail.goodsImageJson)
    this.productImage0 = this.productImages.file0;
    this.initProductDetail();
  },
  methods:{
    initProductDetail(){
      this.distributionFrom.goodsSalePrice = this.productDetail.goodsSalePrice;
      this.distributionFrom.goodsPrice = this.productDetail.goodsSalePrice + 20;

      this.distributionFrom.price = this.productDetail.grouponRulesDto.price;
      this.distributionFrom.participantsMin = this.productDetail.grouponRulesDto.participantsMin;
      this.distributionFrom.participantsMax = this.productDetail.grouponRulesDto.participantsMax;
      this.distributionFrom.ownerRewardRatio = this.productDetail.grouponRulesDto.ownerRewardRatio;
      this.distributionFrom.blindBoxTotalRewardAmount = this.productDetail.grouponRulesDto.blindBoxTotalRewardAmount;
      this.distributionFrom.expirationDay = this.productDetail.grouponRulesDto.expirationDay;
      this.distributionFrom.haggleMinAmount = this.productDetail.grouponRulesDto.haggleMinAmount;
      this.distributionFrom.haggleMaxAmount = this.productDetail.grouponRulesDto.haggleMaxAmount;
      this.distributionFrom.haggleRewardAmount = this.productDetail.grouponRulesDto.haggleRewardAmount;


      this.distributionFrom.distributionMin = this.productDetail.distributionRulesDto.distributionMin;
      this.distributionFrom.distributionPrice = this.productDetail.distributionRulesDto.distributionPrice;
      this.distributionFrom.pledgeAmount = this.productDetail.distributionRulesDto.pledgeAmount;
      this.distributionPledgeAmount = this.productDetail.distributionRulesDto.pledgeAmount;
      this.distributionFrom.distributionRewardRatio = this.productDetail.distributionRulesDto.distributionRewardRatio;
      this.distributionFrom.penaltyRatio = this.productDetail.distributionRulesDto.penaltyRatio;
      this.distributionFrom.distributionExpirationDay = this.productDetail.distributionRulesDto.expirationDay;
    },
    onFileChange(file, fileList) {
      console.log("onFileChange fileList", fileList);
      this.fileList = fileList;
    },
    onProductFileChange(file, fileList) {
      console.log("onProductFileChange fileList", fileList);
      this.productFileList = fileList;
    },
    onNFTFileChange(file, fileList) {
      console.log("onNFTFileChange fileList", fileList);
      this.nftFileList = fileList;
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
    rulesConfirm(){
      this.distributionRules =
          "1.Participate in the distribution to enjoy the exclusive distribution price: "+ this.distributionFrom.distributionPrice +"\n"+
          "2.Minimum distribution quantity: "+ this.distributionFrom.distributionMin +"\n"+
          "3.Participating in distribution users need to pledge "+this.distributionFrom.pledgeAmount+" security deposit, which can be redeemed after completing the distribution task\n" +
          "4.The user will be rewarded "+(this.distributionFrom.distributionRewardRatio*100)+"% of the distribution amount for completing the distribution task\n " +
          "5.The distribution task validity period ends "+this.distributionFrom.distributionExpirationDay+" days after the collection task starts\n " +
          "6.If the task expires and the distribution task is not completed,"+(this.distributionFrom.penaltyRatio*100)+"% of the pledge deposit will be deducted as a penalty";
      this.groupRules =
          "1.Participate in group purchases to enjoy group purchase discounts: "+ this.distributionFrom.price +"\n"+
          "2.Users who participate in the group purchase and hack a knife can get rewards equal to the amount of bargaining(Bargain amount range "+this.distributionFrom.haggleMinAmount+" ~ "+this.distributionFrom.haggleMaxAmount+" )\n" +
          "3.Invite users to participate in group buying activities to enjoy random blind box lottery qualifications, the total reward amount is "+this.distributionFrom.blindBoxTotalRewardAmount+"  ,the number is limited on a first-come-first-served basis\n" +
          "4.Group buying activities need to meet the number of participants: minimum "+this.distributionFrom.participantsMin+" people, maximum "+this.distributionFrom.participantsMax+" people\n" +
          "5.The group leader finally enjoys the preferential price of the product purchased = (group purchase preferential price - (number of participants who cut one knife * cumulative bargaining amount)\n" +
          "6.When the group leader meets the minimum number of participants at the end of the event, they can get a "+(this.distributionFrom.ownerRewardRatio*100)+"% reward of the group purchase sales amount\n " +
          "7.The validity period of the promotion ends "+this.distributionFrom.expirationDay+" days after the start of the group purchase";
      this.rulesConfirmDialogShow = true
    },
    publishDistribution(){
      this.rulesConfirmDialogShow = false;
      if (!this.checked || !this.formValid || !this.imageValid) return;

      let formData = new FormData();
      formData.append('taskParentId', this.taskId)

      Object.keys(this.distributionFrom).forEach((key) => {
        formData.append(""+key, ""+this.distributionFrom[key])
      })

      if (this.productFileList && this.productFileList.length){
        this.productFileList.forEach((file) => {
          formData.append(file.name, file.raw)
        });
      }

      let type = "distribution";
      if (this.nftFileList && this.nftFileList.length){
        type = "nft"
        formData.append('enableNft', true)
        this.nftFileList.forEach((file) => {
          formData.append('nft_'+file.name, file.raw)
        });
      }

      this.showCustomLoading(type)

      publishDistributionTask(formData).then(res => {
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
.distribution-page {
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

  .main-input{
    width: auto;
    flex: 1 1 auto;
    margin-right: 0.1rem;
    margin-left: 0.2rem;
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
        width: 1.55rem;
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
    background: linear-gradient(140deg, #BBBBBB 0%, #BBBBBB 100%);

    &.enable{
      background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);
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
  ::v-deep(.el-textarea__inner:focus) {
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
