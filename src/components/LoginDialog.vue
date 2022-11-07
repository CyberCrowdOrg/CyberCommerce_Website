<template>
  <page-dialog dialogWidth="5.5rem" :dialogShow="dialogShow" @close="dialogClose">
    <template v-slot:dialog-header>
      <div>{{getTitle()}}</div>
    </template>
    <template v-slot:dialog-body>
      <div class="login-dialog-body">

        <div style="display: flex;flex-direction: column;width: 50%;margin-top: 0.17rem;">
          <div class="main-content" style="width: 100%;display: flex;align-items: center;justify-content: center;">WEB3</div>

          <div class="login-button" style="margin-top: 0.16rem" @click="confirm('metamask')">
            <img class="img-left" src="@/assets/images/home/metamask.png" alt="">
            <span style="margin-left: 0.16rem">MetaMask</span>
          </div>

          <div class="login-button" style="margin-top: 0.13rem" @click="confirm('walletconnect')">
            <img class="img-left" src="@/assets/images/home/walletconnect.png" alt="">
            <span style="margin-left: 0.16rem">WalletConnect</span>
          </div>

          <div class="login-button" style="margin-top: 0.13rem" @click="confirm('coinbase')">
            <img class="img-left" src="@/assets/images/home/coinbase.png" alt="">
            <span style="margin-left: 0.16rem">Coinbase</span>
          </div>
        </div>

        <div class="vertical-dashed-line"></div>

        <div style="display: flex;flex-direction: column;width: 50%;margin-top: 0.17rem;">
          <div class="main-content" style="width: 100%;display: flex;align-items: center;justify-content: center;">WEB2</div>

          <div class="login-button" style="margin-top: 0.16rem" @click="confirm('google')">
            <img class="img-right" src="@/assets/images/home/google.png" alt="">
            <span style="margin-left: 0.16rem;">Google</span>
          </div>

          <div class="login-button" style="margin-top: 0.13rem" @click="confirm('twitter')">
            <img class="img-right" src="@/assets/images/home/twitter.png" alt="">
            <span style="margin-left: 0.16rem;">Twitter</span>
          </div>

          <div class="login-button" style="margin-top: 0.13rem" @click="confirm('facebook')">
            <img class="img-right" src="@/assets/images/home/facebook.png" alt="">
            <span style="margin-left: 0.16rem;">Facebook</span>
          </div>
        </div>

      </div>
    </template>
  </page-dialog>
</template>

<script>
import PageDialog from "@/components/PageDialog";

export default {
  name: "LoginDialog",
  props: ["dialogShow","isLinkAccount"],
  components:{
    PageDialog
  },
  data() {
    return {
      workIntroduction: "",
      title:"Login"
    }
  },
  created() {

  },
  methods: {
    dialogClose() {
      this.$emit("close");
    },
    confirm(userOrigin){
      this.$emit("confirm",userOrigin);
    },
    getTitle(){
      return this.isLinkAccount ? "Link other account" : "Login"
    }
  }
}
</script>

<style lang="scss" scoped>
.login-dialog-body{
  display: flex;
  flex-direction: row;

  .login-button {
    display: flex;
    padding: 0.1rem 0.25rem;
    align-items: center;
    //justify-content: center;
    cursor: pointer;
    //height: 0.3rem;
    border-radius: 0.3rem;
    opacity: 1;
    border: 0.01rem solid #E8E8E8;
    font-size: 0.13rem;
    font-weight: 400;
    color: #747474;
    line-height: 0.2rem;

    .img-left {
      width: 0.25rem;
      height: 0.25rem;
      object-fit: cover;
      margin-left: 0.45rem;
    }

    .img-right {
      width: 0.25rem;
      height: 0.25rem;
      object-fit: cover;
      margin-left: 0.6rem;
    }
  }

  .main-content {
    font-size: 0.16rem;
    font-weight: 500;
    color: #1F1F2C;
    line-height: 0.2rem;
  }

  .vertical-dashed-line {
    width: 0.01rem;
    height: 2rem;
    margin-top: 0.22rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    background-image: repeating-linear-gradient(#CCCCCC, #CCCCCC 3px, transparent 3px, transparent 6px);
  }
}
</style>
