<template>
  <div id="app">
    <Header></Header>
    <div ref="router" class="router-view">
      <router-view></router-view>
    </div>
    <Footer v-if="footerVisible" ref="footer"></Footer>

  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import elementResizeDetectorMaker from "element-resize-detector";
import Header from "@/components/Header.vue";

export default {
  name: 'App',
  data() {
    return {
      footerVisible: false
    }
  },
  components: {
    Header,
    Footer
  },
  created() {

  },
  computed: {},
  mounted() {
    // this.watchSize();
    window.addEventListener('storage', this.reload);
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.reload);
  },
  methods: {
    watchSize() {
      //高度大于0 说明页面已经渲染完毕，否则会优先展示底部栏
      let _this = this;
      let erd = elementResizeDetectorMaker({
        strategy: "scroll" //<- For ultra performance.
      });
      erd.listenTo(_this.$refs.router, (element) => {
        let height = element.offsetHeight;
        _this.$nextTick(() => {
          // 这里填写监听改变后的操作
          // console.log("router height == " + height)
          if (height > 0) {
            this.footerVisible = true
          }
        });
      });
    },
    reload(e){
      if (e && e.key && e.key === "reload" && e.newValue === "true"){
        console.log("App reload == "+e.newValue)
        location.reload();
      }
    }
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  position: relative;
  background: #F9F9F9;
}

.router-view {
  //1rem 是footer的高度
  //min-height: calc(100% - 2rem);
  background: #F9F9F9;
  min-height: 100%;
}
</style>
