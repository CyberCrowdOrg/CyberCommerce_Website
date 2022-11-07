<template>
  <page-dialog dialogWidth="6rem" :dialogShow="dialogShow" :enable-scroll="true" @close="dialogClose">
    <template v-slot:dialog-header>
      <div>Cyber Pay</div>
    </template>
    <template v-slot:dialog-body>
      <div class="payment-dialog-body">

        <p class="main-title" style="margin-top: 0.1rem;">Crypto Coin</p>

        <ul>
          <li v-for="item in cryptoChannelList" :key="item.channelId" @click="selectPaymentMode(item)">
            <img
                class="crypto-icon"
                :src="item.channelLogo"
                alt=""/>
            <span class="payment-title">{{item.coinName}}</span>
            <el-radio class="radio" v-model="channelId" :label="item.channelId"></el-radio>
<!--            <el-radio-button class="radio" v-model="channelId" label="1"></el-radio-button>-->
          </li>

          <li>
            <img
                class="crypto-icon"
                src="@/assets/images/home/more.png"
                alt=""/>
            <span class="payment-title">More</span>
<!--            <div class="payment-title" style="height: 0.3rem;display: flex;align-items: center;justify-content: center;">更多</div>-->
          </li>
        </ul>


        <p class="main-title" style="margin-top: 0.2rem;">Fiat Currency</p>

        <ul>
          <li v-for="item in currencyChannelList" :key="item.channelId" @click="selectPaymentMode(item)">
            <img
                class="currency-icon"
                :src="item.channelLogo"
                alt=""/>
            <el-radio class="radio" v-model="channelId" :label="item.channelId"></el-radio>
            <!--            <el-radio-button class="radio" v-model="channelId" label="1"></el-radio-button>-->
          </li>
        </ul>

        <p v-if="false" class="main-title" style="margin-top: 0.2rem;">信用付</p>

        <div class="content-section" v-if="false">
          <p class="text">信用分: {{userInfo.creditScore}}</p>
          <p class="text">您的信用分非常棒,给您授信了一笔 {{userInfo.creditAmount}} 额度的款项</p>
        </div>

        <p class="tips" style="margin-top: 0.12rem;color: red;">*This service is powered by the CyberCrowd hybrid payment engine</p>

        <div class="buy-button" :class="{'disable':!checked}" @click="onPay()">Pay</div>
      </div>
    </template>
  </page-dialog>
</template>

<script>
import PageDialog from "@/components/PageDialog.vue";
import {getUserInfo} from "@/utils";
import {string_util} from "@/mixins/mixin";

export default {
  name: "PaymentDialog",
  props: ["dialogShow","currencyChannelList","cryptoChannelList"],
  components:{
    PageDialog
  },
  mixins: [string_util],
  data() {
    return {
      checked:false,
      channelId: "",
      paymentType: "",
      userInfo:null,
      coinName:"",
      coinIcon:"",
    }
  },
  watch:{
    channelId:{
      handler(val){
        this.checked = !this.isStrEmpty(val);
      },
    },
  },
  mounted() {
    this.userInfo = getUserInfo();
  },
  methods: {
    dialogClose() {
      this.$emit("close");
    },
    onPay(){
      if (!this.checked) return;
      this.$emit("onPay",this.channelId,this.paymentType,this.coinName);
    },
    selectPaymentMode(item){
      this.channelId = item.channelId;
      this.paymentType = item.supportCoinType;
      this.coinName = item.coinName;
      this.coinIcon = item.coinIcon;
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-dialog-body{
  display: flex;
  flex-direction: column;

  .main-title{
    font-size: 0.16rem;
    font-weight: 500;
    color: #1F1F2C;
    line-height: 0.20rem;
  }

  .tips{
    font-size: 0.12rem;
    font-weight: 500;
    color: #CF3135;
    line-height: 0.16rem;
  }

  ul{
    list-style: none;

    li:nth-child(3n+1) {
      margin-left: 0;
    }

    li{
      float:left;
      display: flex;
      padding: 0.1rem;
      align-items: center;
      position: relative;
      cursor: pointer;
      width: 1.68rem;
      margin-left: 0.15rem;
      margin-top: 0.15rem;
      border-radius: 0.1rem;
      border:1px solid #8A8AA0;

      .crypto-icon{
        height: 0.3rem;
        border-radius: 0.25rem;
      }

      .currency-icon{
        height: 0.3rem;
      }

      .payment-title{
        margin-left: 0.1rem;
        font-size: 0.15rem;
        font-weight: 400;
        color: #7A798A;
        line-height: 0.22rem;
      }

      .radio{
        position: absolute;
        right: 0.2rem;
      }

      ::v-deep(.el-radio__label){
        display: none;
        padding: 0;
      }

      ::v-deep(.el-radio__inner:hover) {
        border: 1px solid #007CFF;
      }

      ::v-deep(.el-radio__input.is-checked .el-radio__inner){
        border-color: #007CFF;
        background: #007CFF;
      }
    }
  }

  .content-section {
    display: flex;
    flex-direction: column;
    background: #F8F8F8;
    border-radius: 0.08rem;
    padding: 0.05rem 0.2rem;
    margin-top: 0.15rem;

    .text{
      font-size: 0.14rem;
      font-weight: 400;
      color: #7A798A;
      line-height: 0.22rem;
    }
  }

  .buy-button{
    width: 100%;
    margin: 0.2rem auto 0;
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
}

::v-deep(.el-scrollbar__wrap){
  margin-bottom: 0!important;
  padding: 0!important;
}
</style>
