<template>
  <page-dialog dialogWidth="6rem" :dialogShow="dialogShow" :enable-scroll="true" @close="dialogClose">
    <template v-slot:dialog-header>
      <div>Rules preview</div>
    </template>
    <template v-slot:dialog-body>
      <div class="confirm-dialog-body">

        <p class="main-title" style="margin-top: 0.2rem">Group buy rules</p>
        <p class="main-content" style="margin-top: 0.08rem">{{groupRules}}</p>

        <p class="main-title" style="margin-top: 0.2rem">Distribution rules</p>
        <p class="main-content" style="margin-top: 0.08rem">{{distributionRules}}</p>

        <p class="tips" style="margin-top: 0.12rem;color: red;">*After the above rules are saved, the rules engine starts processing</p>

        <div class="button-section">
          <div class="button cancel" @click="dialogClose">Cancel Publish</div>
          <div class="button confirm" @click="confirm">Confirm Publish</div>
        </div>
      </div>
    </template>
  </page-dialog>
</template>

<script>
import PageDialog from "@/components/PageDialog.vue";

export default {
  name: "RulesConfirmDialog",
  props: ["dialogShow","distributionRules","groupRules"],
  components:{
    PageDialog
  },
  mounted() {

  },
  methods: {
    dialogClose() {
      this.$emit("close");
    },
    confirm(){
      this.$emit("confirm");
    },
  }
}
</script>

<style lang="scss" scoped>
.confirm-dialog-body{
  display: flex;
  flex-direction: column;

  .main-title{
    font-size: 0.16rem;
    font-weight: 500;
    color: #1F1F2C;
    line-height: 0.20rem;
  }

  .main-content {
    font-size: 0.14rem;
    font-weight: 400;
    color: #58606A;
    line-height: 0.2rem;
    white-space: pre-line;
  }

  .tips{
    font-size: 0.12rem;
    font-weight: 500;
    color: #CF3135;
    line-height: 0.16rem;
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

      &.confirm{
        background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);
        margin-left: 0.2rem;
      }

      &.cancel{
        background: linear-gradient(313deg, #0F7BFF 0%, #5995DF 100%);
      }
    }
  }
}

</style>

