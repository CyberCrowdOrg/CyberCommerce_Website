<template>
  <section ref="header" class="header">
    <div class="header-content">
      <img class="logo"
           src="@/assets/images/home/logo_white.png"
           alt=""
           @click="clickLogo">

      <div v-if="!isUserLogin" class="wallet-button" @click="loginAccount()">
        <img src="@/assets/images/home/wallet.png" alt="">
        <span style="margin-left: 0.08rem">Login</span>
      </div>

      <div class="user-avatar" v-if="isUserLogin">
        <el-image class="avatar" :src="userData?userData.userAvatar:''" alt="" @click="goToUserCenter()"></el-image>
<!--        <el-image class="avatar-small" :src="require('@/assets/images/home/btc.png')" alt=""></el-image>-->
        <el-image v-for="item in loginTypeImageList" :key="item" class="avatar-small" :src="item" alt=""></el-image>
        <el-image class="avatar-add" :src="require('@/assets/images/home/add.png')" alt="" @click="linkAccount()"></el-image>
      </div>
    </div>

    <LoginDialog
        :isLinkAccount="isLinkAccount"
        :dialogShow="loginDialogShow"
        @close="loginDialogShow = false"
        @confirm="onLoginTypeSelected"
    ></LoginDialog>
  </section>
</template>

<script>
import {bindAccount, userLogin} from "@/api";
import {deleteUserInfo, getUserInfo, setUserInfo} from "@/utils";
import Cookies from "js-cookie";
import LoginDialog from "@/components/LoginDialog";
import {Message} from "element-ui";
import {
  connectToWallet,
  getWalletAddress,
  isMetaMaskConnected,
  isMetaMaskInstalled,
  setAccountsChangedCallback
} from "@/utils/wallet";


export default {
  name: "HeaderView",
  components:{
    LoginDialog
  },
  data() {
    return {
      activeName: 'tab',
      isHeaderDark: true,
      isWalletConnected: false,
      isUserLogin: false,
      loginDialogShow: false,
      redirectUri:"",
      userData:null,
      loginTypeImageList:[],
      isLinkAccount:false
    };
  },
  mounted() {
    this.initUserInfo();
    this.$bus.$on("OAUTH_LOGIN_EVENT", () => {
      this.initUserInfo()
    })
    this.$bus.$on("USER_LOGIN_EVENT", () => {
      this.loginDialogShow = true;
    })
  },
  destroyed() {
    this.$bus.off("OAUTH_LOGIN_EVENT")
    this.$bus.off("USER_LOGIN_EVENT")
  },
  methods: {
    clickLogo() {
      if (this.$route.path !== '/'){
        this.$router.replace({path: '/'}).catch(()=>{});
      }
    },
    loginAccount(){
      this.isLinkAccount = false;
      this.loginDialogShow =true;
    },
    linkAccount(){
      this.isLinkAccount = true;
      this.loginDialogShow =true;
    },
    initUserInfo(){
      if (!Cookies.get("Mvp_Token")){
        this.$store.commit("setLoginStatus", false);
      }
      this.isUserLogin = this.$store.state.loginStatus;
      this.userData = getUserInfo();

      let _this = this;
      if (this.userData.loginBindList && this.userData.loginBindList.length){
        this.userData.loginBindList.forEach(function (element) {

          if (element.userOrigin !== _this.userData.userOrigin){
            if (element.userOrigin === "metamask") {
              _this.loginTypeImageList.push(require("@/assets/images/home/metamask_small.png"))
            } else if (element.userOrigin === "walletconnect") {
              _this.loginTypeImageList.push(require("@/assets/images/home/walletconnect.png"))
            } else if (element.userOrigin === "coinbase") {
              _this.loginTypeImageList.push(require("@/assets/images/home/coinbase.png"))
            } else if (element.userOrigin === "google") {
              _this.loginTypeImageList.push(require("@/assets/images/home/google.png"))
            } else if (element.userOrigin === "twitter") {
              _this.loginTypeImageList.push(require("@/assets/images/home/twitter_small.png"))
            } else if (element.userOrigin === "facebook") {
              _this.loginTypeImageList.push(require("@/assets/images/home/facebook.png"))
            }
          }
        })
      }

      console.log("isUserLogin == "+this.isUserLogin)
      console.log("userData == "+this.userData)
      //上次登录用的是wallet，判断是否断开
      // if (this.isUserLogin && this.userData && this.userData.userOrigin === 'metamask'){
      //  this.getMetaMaskWalletStatus();
      // }
    },
    async onLoginTypeSelected(userOrigin){
      this.$store.commit("setLinkAccountStatus", this.isLinkAccount);

      this.redirectUri = window.location.origin+"/oauth/callback";

      if (userOrigin === "twitter") {
        let authUrl = "https://twitter.com/i/oauth2/authorize?redirect_uri="+this.redirectUri+"&response_type=code&state=twitter&client_id=YmprdmdOYjlUSnNVQ2Zlekx2UVY6MTpjaQ&scope=tweet.read users.read follows.read offline.access&code_challenge=challenge&code_challenge_method=plain"
        window.open(authUrl, '_self')
      } else if (userOrigin === "google") {
        let authUrl = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+this.redirectUri+"&response_type=code&state=google&client_id=1053767623532-ma4g04ppbch5nuhg1e2n311fq155dkp7.apps.googleusercontent.com&scope=profile openid email&access_type=offline&include_granted_scopes=true&prompt=consent"
        window.open(authUrl, '_self')
      } else if (userOrigin === "facebook") {
        let authUrl = "https://www.facebook.com/v14.0/dialog/oauth?redirect_uri="+this.redirectUri+"&response_type=code&state=facebook&client_id=2899294930367355&scope=public_profile email"
        window.open(authUrl, '_self')
      } else if (userOrigin === "metamask") {
        if (isMetaMaskInstalled()) {
          await this.connectWallet("metamask");
        } else {
          Message.error("请安装MetaMask插件");
        }
      } else if (userOrigin === "walletconnect") {
        await this.connectWallet("walletconnect");
      } else if (userOrigin === "coinbase") {
        await this.connectWallet("coinbase");
      }
    },
    async connectWallet(type) {
      await connectToWallet(type);
      let walletAddress = await getWalletAddress();
      console.log("walletAddress == " + walletAddress);
      if (this.isLinkAccount){
        await this.bindAccount(walletAddress,type);
      }else {
        await this.login(walletAddress,type);
      }
    },
    async login(walletAddress,userOrigin){
      let requestBody = {
        "userOrigin": userOrigin,
        "account": walletAddress,
        "loginType": "WEB3",
        "loginKey": "",
      }
      userLogin(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res.returnCode === "0000"){
          setUserInfo(res.data);
          this.$store.commit("setLoginStatus", true);
          this.initUserInfo();
          this.loginDialogShow = false;
        }
      })
    },
    async bindAccount(walletAddress,userOrigin){
      let requestBody = {
        "userOrigin": userOrigin,
        "account": walletAddress,
        "loginType": "WEB3",
        "loginKey": "",
      }
      bindAccount(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res.returnCode === "0000"){
          let userData = getUserInfo();
          userData.loginBindList = res.data
          setUserInfo(userData);
          this.initUserInfo();
          this.loginDialogShow = false;
        }
      })
    },
    goToUserCenter() {
      if(this.$route.path.indexOf("/user") !== 0) {//不在UserCenter
        this.$router.push({path: "/user"}).catch(()=>{});
      }
    },
    async getMetaMaskWalletStatus() {
      //此处需要修改
      this.isWalletConnected = await isMetaMaskConnected();
      if (this.isWalletConnected) {
        await setAccountsChangedCallback(async () => {
          //通过监听账户，可判断和metamask是否断开连接
          console.log("accountsChanged")
          this.isWalletConnected = await isMetaMaskConnected()
        });
      } else {
        console.log("MetaMask Wallet not Connected")
        this.$store.commit("setLoginStatus", false);
        deleteUserInfo()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  background: #007CFF;

  .header-content {
    width: 12rem;
    height: 0.8rem;
    display: flex;
    margin: 0 auto;
    align-items: center;
    position: relative;

    .logo {
      width: 1.6rem;
      position: absolute;
      left: 0;
      cursor: pointer;
    }

    .wallet-button {
      display: flex;
      position: absolute;
      right: 0;
      padding: 0.1rem 0.25rem;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 0.2rem;
      border-radius: 0.24rem;
      opacity: 1;
      border: 0.01rem solid #FFFFFF;
      font-weight: bold;
      font-size: 0.15rem;
      line-height: 0.2rem;
      color: #FFFFFF;

      img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }

    .user-avatar{
      display: flex;
      position: absolute;
      right: 0;
      align-items: flex-end;
      justify-content: center;

      .avatar {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0.4rem;
        border: 0.01rem solid #FFFFFF;
        object-fit: cover;
        background: #EBEBEB;
        cursor: pointer;
      }
      .avatar-small {
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
        object-fit: cover;
        background: #FFFFFF;
        border: 0.01rem solid #FFFFFF;
        cursor: pointer;
        margin-left: 0.03rem;
      }

      .avatar-add{
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
        margin-left: 0.03rem;
        cursor: pointer;
      }
    }

  }
}
</style>
