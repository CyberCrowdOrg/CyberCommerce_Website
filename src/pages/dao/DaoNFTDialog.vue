<template>
  <page-dialog dialogWidth="380px" :dialogShow="dialogShow" @close="dialogClose">
    <template v-slot:dialog-header>
      <div>Mint DAO NFT</div>
    </template>
    <template v-slot:dialog-body>
      <div class="dao-nft-dialog-body">

        <img class="nft-image" :src="imageUrl" alt="">

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
  name: "DaoNFTDialog",
  props: ["dialogShow","imageUrl"],
  components:{
    PageDialog
  },
  data() {
    return {

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
.dao-nft-dialog-body{
  display: flex;
  flex-direction: column;

  .nft-image{
    width: 2rem;
    object-fit: cover;
    margin: 0 auto;
    border: 1px #EBEBEB solid;
    border-radius: 0.1rem;
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
