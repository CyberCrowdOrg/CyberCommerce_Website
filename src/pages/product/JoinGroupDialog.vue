<template>
  <page-dialog dialogWidth="520px" :dialogShow="dialogShow" @close="dialogClose">
    <template v-slot:dialog-header>
      <div>Group</div>
    </template>
    <template v-slot:dialog-body>
      <div class="join-group-dialog-body">

        <div style="display: flex">

          <div class="form">
            <span class="label">Group Price:</span><span class="value">￥{{price}}</span>
          </div>
          <div class="form">
            <span class="label">Minimum Members:</span><span class="value">{{groupInfo.grouponPeopleLimit}}</span>
          </div>
          <div class="form">
            <span class="label">Current Members:</span><span class="value">{{groupInfo.grouponPeople}}</span>
          </div>

        </div>

        <div class="count-down">Countdown：<CountDown :leftTime="groupInfo.taskEndTimeMillisecond"></CountDown></div>

        <div class="button-section">
          <div class="button buy" @click="groupBuy">Group Buy</div>
          <div class="button join-group" @click="haggle">Haggle</div>
        </div>

        <div class="bargain">
          Successful bargaining will reward {{reward}}CCP
        </div>
      </div>
    </template>
  </page-dialog>
</template>

<script>
import PageDialog from "@/components/PageDialog.vue";
import CountDown from "@/components/CountDown.vue";

export default {
  name: "JoinGroupDialog",
  props: {
    dialogShow:Boolean,
    reward:Number,
    price:Number,
    groupInfo:Object,
  },
  components:{
    CountDown,
    PageDialog
  },
  data() {
    return {
      workIntroduction: "",
    }
  },
  methods: {
    dialogClose() {
      this.$emit("close");
    },
    groupBuy(){
      this.$emit("groupBuy",this.groupInfo.taskId);
    },
    haggle(){
      this.$emit("haggle",this.groupInfo.taskId);
    },
  }
}
</script>

<style lang="scss" scoped>
.join-group-dialog-body{
  display: flex;
  flex-direction: column;

  .count-down{
    display: flex;
    font-size: 0.15rem;
    color: #7A798A;
    align-items: center;
    //margin: 0.2rem auto 0;
    margin: 0.2rem 0 0;
  }

  .form {
    display: flex;
    align-items: center;
    margin-top: 0.12rem;
    width: 100%;

    .label {
      font-size: 0.15rem;
      font-weight: 400;
      color: #7A798A;
      line-height: 0.22rem;
    }

    .value {
      margin-left: 0.1rem;
      font-size: 0.15rem;
      font-weight: bold;
      color: #1F1F2C;
      line-height: 0.22rem;
    }
  }

  .button-section{
    width: 100%;
    margin-top: 0.25rem;
    height: 0.4rem;
    display: flex;

    .button{
      width: 100%;
      height: 100%;
      border-radius: 0.56rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 0.14rem;
      color: #FFFFFF;
      cursor: pointer;

      &.buy{
        background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);
      }

      &.join-group{
        background: linear-gradient(313deg, #0F7BFF 0%, #5995DF 100%);
        margin-left: 0.2rem;
      }
    }
  }

  .bargain{
    margin-top: 0.1rem;
    font-size: 0.12rem;
    font-weight: 400;
    color: #7A798A;
    line-height: 0.22rem;
    text-align: right;
  }
}
</style>
