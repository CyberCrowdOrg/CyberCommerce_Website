<template>
<!--  <div class="page-dialog" :class="{isDialogShow:dialogShow}" @touchmove.prevent @mousewheel.prevent>-->
  <div class="page-dialog" :class="{isDialogShow:dialogShow}">
    <div class="dialog-box" :style="{width:dialogWidth}">
      <div class="dialog-header">
        <i v-if="enableClose" @click="closePageDialog" class="el-icon-circle-close" style="cursor: pointer"></i>
        <slot name="dialog-header" class="dialog-header-title"></slot>
      </div>
      <div class="dialog-body">
        <slot name="dialog-body"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageDialog",
  props: {
    dialogWidth: String,
    dialogShow: Boolean,
    enableScroll: {
      type: Boolean,
      default: false
    },
    enableClose: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {

    }
  },
  watch:{
    dialogShow(val){
      if (val){
        if (!this.enableScroll){
          window.addEventListener('mousewheel',this.preventBodyScroll, { passive: false })
        }
      }else {
        window.removeEventListener('mousewheel',this.preventBodyScroll)
      }
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    closePageDialog() {
      this.$emit("close");
    },
    preventBodyScroll(event){
      event.preventDefault();
    }
  }
}
</script>
<style>
.page-dialog {
  display: none;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1px;
  background: rgba(0, 0, 0, 0.3);
  overflow:auto;
}

.page-dialog::-webkit-scrollbar {
   width: 0;
   height: 0;
   background-color: transparent;
 }
.page-dialog::-webkit-scrollbar-thumb {
   border-radius: 0;
   background-color: transparent;
 }

.isDialogShow {
  display: block;
}

.dialog-box {
  margin: 100px auto 50px;
  background: #fff;
  border-radius: 20px;
}

.dialog-box .dialog-header {
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: #343444;
  border-radius: 20px 20px 0 0;
  line-height: 60px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.dialog-box .dialog-header > i {
  position: absolute;
  top: 16px;
  right: 20px;
  display: inline-block;
  width: 28px;
  height: 28px;
  font-size: 28px;
  color: #fff;
}

.dialog-box .dialog-body {
  width: 100%;
  background: #FFFFFF;
  border-radius: 0 0 20px 20px;
  padding: 10px 20px 30px;
}
</style>
