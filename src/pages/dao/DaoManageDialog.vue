<template>
  <page-dialog dialogWidth="480px" :dialogShow="dialogShow" @close="dialogClose">
    <template v-slot:dialog-header>
      <div>Proposal Vote</div>
    </template>
    <template v-slot:dialog-body>
      <div class="dao-manage-dialog-body">

        <p class="main-content" style="margin-top: 0.2rem">{{"You are voting "+vote+" to this proposal, are you sure you want to continue?"}}</p>

        <div class="button-section">
          <div class="button cancel" @click="dialogClose">Cancel</div>
          <div class="button confirm" @click="confirm">Confirm</div>
        </div>

      </div>
    </template>
  </page-dialog>
</template>

<script>
import PageDialog from "@/components/PageDialog.vue";

export default {
  name: "DaoManageDialog",
  props: ["dialogShow","vote"],
  components:{
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
    confirm(){
      this.$emit("confirm");
    },
  }
}
</script>

<style lang="scss" scoped>
.dao-manage-dialog-body{
  display: flex;
  flex-direction: column;

  .main-content {
    font-size: 0.16rem;
    font-weight: 400;
    color: #58606A;
    line-height: 0.18rem;
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
