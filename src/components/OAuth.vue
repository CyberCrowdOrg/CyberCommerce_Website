<template>
  <div>

  </div>
</template>

<script>
import {bindAccount, userLogin} from "@/api";
import {getUserInfo, setUserInfo} from "@/utils";

export default {
  name: "OAuth",
  data() {
    return {
      redirectUri:"",
    };
  },
  mounted() {
    this.redirectUri = window.location.origin+"/oauth/callback";
    this.queryParams = this.$route.query;
    console.log("code == " + this.queryParams.code)
    console.log("state == " + this.queryParams.state)
    this.login()
  },
  methods: {
    login() {
      if (this.queryParams.code) {
        let userOrigin = ""
        if (this.queryParams.state.indexOf("twitter") === 0) {
          userOrigin = "twitter"
        } else if (this.queryParams.state.indexOf("google") === 0) {
          userOrigin = "google"
        } else if (this.queryParams.state.indexOf("facebook") === 0) {
          userOrigin = "facebook"
        }

        console.log("isLinkAccount == "+ this.$store.state.isLinkAccount)

        if (this.$store.state.isLinkAccount){
          this.bindAccount(userOrigin, this.queryParams.code)
        }else {
          this.loginByOAuth(userOrigin, this.queryParams.code)
        }
      }
    },
    loginByOAuth(userOrigin, code) {
      console.log("userOrigin",userOrigin)
      let requestBody = {
        "userOrigin": userOrigin,
        "loginType": "WEB2",
        "account": "",
        "loginKey": code,
        "redirectUri":this.redirectUri
      }
      userLogin(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res && res.returnCode === "0000") {
          //1.保存用户信息
          setUserInfo(res.data);
          this.$store.commit("setLoginStatus", true);
          //2.保存全局刷新参数(等于发送刷新指令)
          // localStorage.setItem("reload", "true");
          //3.关闭当前窗口
          // window.close()
        }
        this.$router.replace({path: '/'}).catch(()=>{});
        this.$bus.$emit("OAUTH_LOGIN_EVENT")
      })
    },
    bindAccount(userOrigin, code){
      let requestBody = {
        "userOrigin": userOrigin,
        "loginType": "WEB2",
        "account": "",
        "loginKey": code,
        "redirectUri":this.redirectUri
      }
      bindAccount(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res.returnCode === "0000"){
          let userData = getUserInfo();
          userData.loginBindList = res.data
          setUserInfo(userData);
        }
        this.$router.replace({path: '/'}).catch(()=>{});
        this.$bus.$emit("OAUTH_LOGIN_EVENT")
      })
    },
  }
}
</script>

<style scoped>

</style>
