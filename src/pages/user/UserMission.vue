<template>
  <div class="mission-panel">
    <el-empty v-if="!(baseUserTaskList && baseUserTaskList.length)" description="No related tasks yet"></el-empty>

    <ul>
      <li v-for="item in baseUserTaskList" :key="item.taskId" @click="daoDetail(item.daoNo)">

        <p class="main-title toe" style="">{{item.taskName}}</p>
        <p class="main-text toe" style="margin-top: 0.12rem;">DAO:{{item.daoName}}</p>
        <p class="main-text-small" style="margin-top: 0.06rem;">Start Time: {{item.createTime}}</p>
        <p class="main-text-small toe" style="margin-top: 0.02rem;">Task Status: {{taskStatus(item.taskStatus)}}</p>

      </li>
    </ul>
  </div>
</template>

<script>
import {getUserMissionInfo} from "@/api";
import {scrollToY} from "@/utils";

export default {
  name: "UserMission",
  data(){
    return{
      baseUserTaskList: [],
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.getUserMissionInfo();
  },
  methods:{
    getUserMissionInfo(){
      let requestBody={"pageNum": 1,"pageSize": 40}
      getUserMissionInfo(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res) {
          this.baseUserTaskList = res.data.baseUserTaskList
        }
      })
    },
    taskStatus(status){
      //"taskStatus": "6", //任务状态 ，0 任务未开始 1 任务已开始 5 任务验收中 6 任务已完成
      if (status === "0"){
        return "Not started"
      }else if (status === "1"){
        return "Started"
      }else if (status === "5"){
        return "Accepting"
      }else if (status === "6"){
        return "Completed"
      }
    },
    daoDetail(daoNo){
      this.$router.push({
        path: "/dao",
        query: {
          daoNo: daoNo,
        },
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.mission-panel{
  display: flex;
  flex-direction: column;
  padding-top: 0.2rem;
  padding-bottom: 1.5rem;
  width: 7rem;
  margin: 0 auto;

  .main-title {
    font-size: 0.18rem;
    font-weight: 500;
    color: #1F1F2C;
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
    li{
      display: flex;
      flex-direction: column;
      border: 1px #EBEBEB solid;
      border-radius: 0.1rem;
      padding: 0.2rem;
      margin-top: 0.2rem;
      cursor: pointer;
    }
  }
}
</style>
