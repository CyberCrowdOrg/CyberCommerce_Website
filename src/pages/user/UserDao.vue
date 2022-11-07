<template>
  <div class="dao-panel">
    <el-empty v-if="!(userDaoDtoList && userDaoDtoList.length)" description="No related DAOs yet"></el-empty>

    <ul>
      <li @click="daoDetail(item.daoNo)" v-for="item in userDaoDtoList" :key="item.daoNo">
        <p class="main-title toe">{{item.daoName}}</p>
        <p class="main-text" style="margin-top: 0.1rem">{{ 'Organizer:'+addressFilter(item.userWalletAddr) }}</p>
        <p class="main-text-small" style="margin-top: 0.1rem">Members：{{item.memberNumber}}</p>
        <el-image v-if="item.owner" class="avatar" :src="item.userAvatar" alt=""></el-image>
      </li>
    </ul>
  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {getUserDaoInfo} from "@/api";
import {address_filter} from "@/mixins/mixin";

export default {
  name: "UserDao",
  mixins:[address_filter],
  data(){
    return{
      userDaoDtoList: [],
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.getUserDaoInfo();
  },
  methods:{
    daoDetail(daoNo){
      this.$router.push({
        path: "/dao",
        query: {
          daoNo: daoNo,
        },
      })
    },
    getUserDaoInfo(){
      let requestBody={"pageNum": 1,"pageSize": 40}
      getUserDaoInfo(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        this.userDaoDtoList = res.data.userDaoDtoList;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dao-panel{
  display: flex;
  flex-direction: column;
  padding-top: 0.2rem;
  padding-bottom: 1.5rem;
  width: 8rem;
  margin: 0 auto;

  .main-title {
    font-size: 0.18rem;
    font-weight: 500;
    color: #111111;
    line-height: 0.25rem;
  }

  .main-text {
    font-size: 0.14rem;
    font-weight: 400;
    color: #444444;
    line-height: 0.18rem;
  }

  .main-content {
    font-size: 0.16rem;
    font-weight: 400;
    color: #58606A;
    line-height: 0.18rem;
  }

  .main-text-small {
    font-size: 0.12rem;
    font-weight: 400;
    color: #58606A;
    line-height: 0.16rem;
  }

  ul{
    list-style: none;

    //li:nth-child(3n+1) {
    //  margin-left: 0;
    //}

    li{
      float: left;
      display: flex;
      flex-direction: column;
      border: 1px #EBEBEB solid;
      border-radius: 0.1rem;
      padding: 0.2rem;
      margin-top: 0.2rem;
      cursor: pointer;
      width: 25%;
      margin-left: 0.2rem;
      position: relative;

      .avatar{
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 0.3rem;
        object-fit: cover;
      }

      .button{
        height: 0.35rem;
        border-radius: 0.56rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 0.14rem;
        color: #FFFFFF;
        cursor: pointer;
        padding: 0 0.3rem;

        &.approve{
          background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);
        }

        &.reject{
          background: linear-gradient(313deg, #0F7BFF 0%, #5995DF 100%);
          margin-left: 0.2rem;
        }

        &.distribution{
          background: linear-gradient(313deg, #5142FC 0%, #827BFA 100%);
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
