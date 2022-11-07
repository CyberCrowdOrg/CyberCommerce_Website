<template>
  <div class="user-center">

    <div class="left-side">

      <div v-if="userInfo" class="user-info">
        <el-image class="user-avatar" :src="userInfo.userAvatar" alt=""></el-image>

        <p class="user-name">{{ userNameFilter(userInfo.nickName) }}</p>

        <div style="display: flex;align-items: center;margin-top: 0.22rem;">
          <p class="left-text" style="margin-left: 0.35rem">Credit Score</p>
          <p class="left-text">{{userInfo.creditScore}}</p>
        </div>

        <div style="display: flex;align-items: center;margin-top: 0.1rem;">
          <p class="left-text" style="margin-left: 0.35rem">Credit Amount</p>
          <p class="left-text">{{userInfo.creditAmount}}</p>
        </div>

        <div style="display: flex;align-items: center;margin-top: 0.1rem;">
          <p class="left-text" style="margin-left: 0.35rem">Login Method</p>
          <p class="left-text">{{userInfo.userOrigin}}</p>
        </div>
        <div style="display: flex;align-items: center;margin-top: 0.1rem;">
          <p class="left-text" style="margin-left: 0.35rem">Linked Account</p>
          <p class="left-text" style="white-space: pre-line;">{{loginType}}</p>
        </div>

        <div class="logout" @click="logout()">
          Logout
        </div>
      </div>

      <ul>
        <li :class="{'active':panel === 'account'}" @click="clickTabItem('account')">Account</li>
        <li :class="{'active':panel === 'shop'}" @click="clickTabItem('shop')">My Shop</li>
        <li :class="{'active':panel === 'group'}" @click="clickTabItem('group')">My Group</li>
        <li :class="{'active':panel === 'distribution'}" @click="clickTabItem('distribution')">My Distribution</li>
        <li :class="{'active':panel === 'dao'}" @click="clickTabItem('dao')">My DAO</li>
        <li :class="{'active':panel === 'mission'}" @click="clickTabItem('mission')">My Task</li>
        <li :class="{'active':panel === 'transaction'}" @click="clickTabItem('transaction')">Transactions</li>
      </ul>

    </div>

    <div class="right-side">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>

import {deleteUserInfo, getUserInfo, scrollToY} from "@/utils";
import {name_filter} from "@/mixins/mixin";
import {disconnect} from "@/utils/wallet";
export default {
  name: "UserCenter",
  components: {},
  mixins: [name_filter],
  data() {
    return {
      panel: '',
      userInfo:null,
      loginType:"",
    }
  },
  watch: {
    $route: {
      handler: function (val) {
        console.log("user router to path", val)
        if(val.path.indexOf("/user") === 0) {//在UserCenter
          this.panel = val.meta.childPath
        }
      },
      deep: true,
      immediate: true
    },
  },
  mounted() {
    scrollToY(0, 0);
    this.userInfo = getUserInfo();
    this.loginType = this.getLoginType();
  },
  methods: {
    clickTabItem(path) {
      this.panel = path;
      let routerPath = "/user/" + path;
      if (this.$route.path !== routerPath){
        this.$router.replace({path: routerPath}).catch(()=>{});
      }
    },
    logout(){
      this.showLoading();
      this.$store.commit("setLoginStatus", false);
      disconnect();
      deleteUserInfo();
      this.hideLoading();
      this.$router.replace({path: '/'}).catch(()=>{});
      location.reload();
    },
    getLoginType(){
      let type = "";
      let _this = this;
      if (this.userInfo.loginBindList && this.userInfo.loginBindList.length){
        this.userInfo.loginBindList.forEach(function(element) {
          if (element.userOrigin !== _this.userInfo.userOrigin){
            type = type.concat(element.userOrigin+"\n");
          }
        });
      }
      return type;
    }
  }
}
</script>

<style lang="scss" scoped>

.user-center {
  display: flex;
  flex-direction: row;
  padding-top: 0.8rem;
  width: 12rem;
  min-height: 100vh;
  margin: 0 auto;

  .left-side {
    width: 2.5rem;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .left-text {
      font-size: 0.12rem;
      font-weight: 400;
      color: #747474;
      line-height: 0.17rem;
      width: 50%;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      width: 2.1rem;
      margin-top: 0.3rem;
      background: #FFFFFF;
      box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
      border-radius: 0.2rem;

      .user-avatar {
        margin: 0.3rem auto 0;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 0.6rem;
        object-fit: cover;
        background: #EBEBEB;
        border: 0.01rem solid #FFFFFF;
      }

      .user-name {
        margin: 0.15rem auto 0;
        font-size: 0.16rem;
        font-weight: 400;
        color: #020027;
        line-height: 0.22rem;
      }

      .logout{
        width: 1.4rem;
        margin: 0.12rem 0.35rem 0.2rem;
        display: flex;
        padding: 0.1rem 0;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        height: 0.15rem;
        border-radius: 0.3rem;
        opacity: 1;
        border: 0.01rem solid #CCCCCC;
        font-weight: bold;
        font-size: 0.15rem;
        line-height: 0.2rem;
        color: #CCCCCC;
      }
    }

    ul {
      list-style: none;
      width: 2.1rem;
      background: #FFFFFF;
      box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
      border-radius: 0.2rem;
      margin-top: 0.2rem;



      li {
        //padding: 0 0.3rem;
        cursor: pointer;
        height: 0.24rem;
        font-size: 0.14rem;
        font-weight: 500;
        color: #020027;
        line-height: 0.24rem;
        width: 100%;
        padding-left: 0.38rem;
        border-left:0.03rem solid transparent;
        margin-top: 0.2rem;

        &:first-child{
          margin-top: 0.28rem;
        }

        &:last-child{
          margin-bottom: 0.2rem;
        }

        &.active {
          border-left:0.03rem solid #0F7BFF;
        }

      }
    }
  }

  .right-side {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    width: 9.5rem;
    min-height: 100%;
    //background: #8A8AA0;
    background: #FFFFFF;
    box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
    border-radius: 0.2rem;
    padding: 0;
  }
}
</style>
