<template>
  <div class="checkout-page">
    <div class="main-title" style="margin: 0.2rem auto 0;">Scan the Qrcode</div>

    <div class="qrcode-layout">
      <QRCanvas :options="options"></QRCanvas>
    </div>

    <div class="order-layout">
      <p>Order No.: {{order.orderNo}}</p>
      <p>Order Amount: ${{order.amount}}</p>
      <p>Order Coin: {{order.coinName}}</p>
    </div>

    <ResultDialog ref="successDialog" :status="'success'" :title="'Success'" @onDialogClose="onDialogClose()"></ResultDialog>
  </div>
</template>

<script>
import ResultDialog from "@/components/ResultDialog";
const { QRCanvas } = require('qrcanvas-vue');

export default {
  name: "CheckoutPage",
  components: {
    QRCanvas,
    ResultDialog
  },
  data(){
    return{
      options: {
        cellSize: 10,
        data: '0x34BB184bFb7B7795cc1Ded050deA1344c392A7C1',
      },
      order:{
        orderNo:"",
        amount:"",
        coinName:"",
      }
    }
  },
  mounted(){
    this.order.orderNo = this.$route.query.orderNo
    this.order.amount = this.$route.query.amount
    this.order.coinName = this.$route.query.coinName

    // this.showSuccess();

    let _this = this;
    document.onkeydown = function(e) {   //按下回车提交
      let key = window.event.keyCode;
      //事件中keycode=13为回车事件
      if (key === 13) {
        _this.showSuccess();
      }
    };
  },
  methods:{
    showSuccess(){
      setTimeout(() => {
        this.$refs.successDialog.showDialog();
      }, 10);
    },
    onDialogClose(){
      this.$router.replace({path: "/user/transaction"}).catch(()=>{});
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-page {
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
  }

  .qrcode-layout{
    display: flex;
    margin: 0.2rem auto 0;
    flex-direction: column;
    width: 3rem;
    height: 3rem;
    background: #FFFFFF;
    box-shadow: 0 0.03rem 0.16rem 0 rgba(47, 83, 109, 0.1200);
    border-radius: 0.2rem;
    padding: 0.2rem;

    .qrcode-image{
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  .order-layout{
    width: 3rem;
    margin: 0.3rem auto 0;
    font-size: 0.16rem;
    font-weight: 400;
    color: #AAAAAA;
    line-height: 0.2rem;
    display: flex;
    flex-direction: column;
  }
}
</style>
