<template>
  <div class="dao-section">
    <div class="title">DAO Plaza</div>

    <div class="divider"></div>

    <ul>
      <li @click="daoDetail(item.daoNo)" v-for="item in baseDaoDtoList" :key="item.daoNo">
        <p class="main-title toe">{{item.daoName}}</p>
        <p class="main-text" style="margin-top: 0.1rem">{{ 'Organizer:'+addressFilter(item.userWalletAddr) }}</p>
        <p class="main-text-small" style="margin-top: 0.1rem">Members：{{item.memberNumber}}</p>
        <el-image class="avatar" :src="item.userAvatar" alt=""></el-image>
      </li>
    </ul>
  </div>
</template>

<script>
import {address_filter} from "@/mixins/mixin";
import {getAllDaoList} from "@/api";
import {Message} from 'element-ui';

export default {
  name: "DaoSection",
  mixins:[address_filter],
  data(){
    return{
      baseDaoDtoList: [],
    }
  },
  mounted() {
    this.getAllDaoList();
  },
  methods:{
    daoDetail(daoNo){
      if (!this.$store.state.loginStatus){
        Message.warning("Please login!");
        return;
      }
      this.$router.push({
        path: "/dao",
        query: {
          daoNo: daoNo,
        },
      })
    },
    getAllDaoList(){
      let requestBody={"pageNum": 1,"pageSize": 20}
      getAllDaoList(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        this.baseDaoDtoList = res.data.baseDaoDtoList;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dao-section {
  width: 12rem;
  margin: 0 auto 1rem;
  display: flex;
  flex-direction: column;

  .title {
    margin: 0.5rem auto 0;
    color: #1F1F2C;
    line-height: 0.44rem;
    font-size: 0.36rem;
  }

  .divider {
    margin: 0.15rem auto 0;
    width: 0.8rem;
    height: 0.03rem;
    background: #007CFF;
    opacity: 1;
  }

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
    margin-top: 0.1rem;
    width: 100%;

    li:nth-child(4n) {
      margin-right: 0;
    }

    li{
      float: left;
      display: flex;
      flex-direction: column;
      width: 2.28rem;
      margin-right: 0.4rem;
      background: #FFFFFF;
      border: 1px #EBEBEB solid;
      border-radius: 0.1rem;
      padding: 0.2rem;
      margin-top: 0.2rem;
      cursor: pointer;
      position: relative;

      .avatar{
        position: absolute;
        right: 0.1rem;
        bottom: 0.1rem;
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
