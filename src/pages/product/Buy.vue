<template>
  <div class="buy-page">

    <p class="main-title">Delivery Information:</p>

    <el-form :model="deliveryForm" :rules="rules" ref="deliveryForm" label-width="0.8rem" class="form">
      <el-form-item label="Address" prop="address">
        <el-input type="textarea" v-model="deliveryForm.address" placeholder="Please enter address"></el-input>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="deliveryForm.name" placeholder="Please enter your name"></el-input>
      </el-form-item>

      <el-form-item label="Phone" prop="phone">
        <el-input type="tel" v-model="deliveryForm.phone" placeholder="Please enter the phone number"></el-input>
      </el-form-item>
    </el-form>

    <p class="main-title">Order Information:</p>

    <div class="order-info" v-if="productDetail">
      <img
          class="product-image"
          :src="productImage0"
          alt=""/>

      <div class="product-info">
        <div class="product-title toe">{{this.productDetail.goodsTitle}}</div>
        <div class="product-price">Unit Price: ${{price}}</div>
        <el-input-number size="mini" :min="1" :max="100" placeholder="0" v-model="amount" class="amount"></el-input-number>
      </div>
    </div>

    <p class="main-title">Order Amount: <span style="color: red;">${{totalAmount}}</span></p>

    <div style="height: 60px"></div>

    <div class="buy-button" @click="checkOrder('deliveryForm')">Pay</div>

    <PaymentDialog
        v-if="payChannelList && payChannelList.length"
        :dialogShow="showPaymentDialog"
        :currencyChannelList="currencyChannelList"
        :cryptoChannelList="cryptoChannelList"
        @close="showPaymentDialog = false"
        @onPay="onPay(arguments)">
    </PaymentDialog>
  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import PaymentDialog from "./PaymentDialog.vue";
import {createOrder, createPaymentOrder, getProductDetail, paymentChannel} from "@/api";
import {Loading} from "element-ui";

export default {
  name: "BuyPage",
  components:{
    PaymentDialog,
  },
  data() {
    let validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter address'));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your name'));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the phone number'));
      } else {
        callback();
      }
    };
    return {
      showPaymentDialog:false,
      productDetail:null,
      orderNo:"",
      payChannelList:[],
      currencyChannelList:[],
      cryptoChannelList:[],
      amount:1,
      price:0,
      totalAmount:0,
      productImage0:"",
      deliveryForm: {
        address: "7018 S Western Ave, Los Angeles, CA 90047",
        name: "John Snow",
        phone: "+1 3232121016",
      },
      rules: {
        address: [
          {required: true, validator: validateAddress, trigger: 'blur'}
        ],
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ],
        phone: [
          {required: true, validator: validatePhone, trigger: 'blur'}
        ],
      }
    }
  },
  watch:{
    amount(val){
      this.totalAmount = val*this.price;
    },
    price(val){
      this.totalAmount = val*this.amount;
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.totalAmount = this.amount*this.price;
    this.taskId = this.$route.query.taskId
    this.groupId = this.$route.query.groupId
    this.type = this.$route.query.type
    this.getProductDetail();
    this.getPaymentMethod();
  },
  methods: {
    getProductDetail(){
      this.productDetail = JSON.parse(sessionStorage.getItem(this.taskId))
      this.productImages = JSON.parse(this.productDetail.goodsImageJson)
      this.productImage0 = this.productImages.file0;
      if (this.type === "group"){
        this.price = this.productDetail.grouponRulesDto.price
      }else {
        this.price = this.productDetail.goodsSalePrice;
      }
    },
    getPaymentMethod(){
      let requestBody={"pageNum": 1,"pageSize": 40}
      paymentChannel(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        this.payChannelList = res.data.payChannelDtoList;
        this.payChannelList.forEach(this.sortPaymentChannel)
      })
    },
    sortPaymentChannel(channel){
      let coinType = channel.supportCoinType.toString().trim()
      if (coinType === "fiat") {
        this.currencyChannelList.push(channel)
      } else if (coinType === "crypto") {
        this.cryptoChannelList.push(channel)
      }
    },
    checkOrder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.showPaymentDialog = true;
          this.createOrder()
        } else {
          console.log('信息错误');
          return false;
        }
      });
    },
    createOrder(){
      let task
      let orderType
      if (this.type === "group") {
        task = this.groupId;
        orderType = "groupon_buy"
      } else {
        task = this.taskId;
        orderType = "trade"
      }
      let requestBody={"taskId": task,"orderType":orderType}
      createOrder(requestBody).then(res =>{
        console.log(JSON.stringify(res, null, 4))
        if (res){
          this.orderNo = res.data.orderNo
          this.showPaymentDialog = true;
        }
      })
    },
    onPay(params){
      this.showPaymentDialog = false;
      let channelId = params[0];
      let paymentType = params[1];
      console.log("channelId == "+channelId +" paymentType == "+paymentType)
      // this.showCustomLoading(paymentType)
      let requestBody={"orderNo": this.orderNo,"channelId":channelId,"payMethod":"online"}
      createPaymentOrder(requestBody).then(res =>{
        console.log(JSON.stringify(res, null, 4))
        if (res){
          // this.$router.replace({path: "/user/transaction"}).catch(()=>{});
          this.goToCheckout(params[2])
        }
        // this.hideCustomLoading()
      }).catch(error => {
        // this.hideCustomLoading();
        console.log("error",error)
      })
    },
    goToCheckout(coinName){
      this.$router.push({
        path: "/product/checkout",
        query: {
          amount: this.totalAmount,
          orderNo:this.orderNo,
          coinName:coinName
        },
      })
    },
    showCustomLoading(paymentType){
      let text = paymentType === "crypto"?"Blockchain confirming...":"Paying..."
      this.customLoading = Loading.service(
          {
            fullscreen: true,
            spinner:"block-spinner",
            // text:"正在铸造中...",
            text:text,
            customClass:"custom-block-spinner"
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
  },
}
</script>

<style lang="scss" scoped>

.buy-page {
  display: flex;
  flex-direction: column;
  padding-top: 0.8rem;
  padding-bottom: 1.5rem;
  width: 12rem;
  margin: 0 auto;

  .main-title {
    margin-top: 0.2rem;
    font-size: 0.18rem;
    font-weight: 500;
    color: #1F1F2C;
    line-height: 0.25rem;
  }

  .form {
    margin-top: 0.2rem;
    width: 60%;
  }

  .order-info {
    display: flex;
    margin-top: 0.2rem;
    width: 60%;
    align-items: center;

    .product-image {
      width: 1rem;
      height: 1rem;
      background: #EBEBEB;
      border-radius: 0.12rem;
      object-fit: cover;
    }

    .product-info {
      margin-left: 0.2rem;
      display: flex;
      flex-direction: column;

      .product-title {
        width: 6rem;
        font-size: 0.15rem;
        font-weight: bold;
        color: #1F1F2C;
        line-height: 0.22rem;
      }

      .product-price {
        font-size: 0.13rem;
        font-weight: 400;
        color: #7A798A;
        line-height: 0.2rem;
        margin-top: 0.08rem;
      }

      .amount{
        margin-top: 0.08rem;
        width: 0.9rem;
      }
    }
  }

  .buy-button{
    width: 60%;
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
  }

  ::v-deep(.el-input__inner:focus) {
    // el-input输入时设置边框颜色
    border: #007CFF 1px solid;
  }
  ::v-deep(.el-textarea__inner:focus) {
    // el-input输入时设置边框颜色
    border: #007CFF 1px solid;
  }
}


</style>
