<template>
  <div class="first-section" :style="sectionStyle">

    <!-- 比例5:2 -->
    <img class="banner" :style="sectionStyle" src="https://d288ikp9ge2crg.cloudfront.net/mvp/website/home/home_banner_220922.png" alt="">

    <div class="slogan">
      <div>Virtual Product Trading Community</div>
      <div class="divider"></div>
      <div class="button" @click="publishProduct()">START</div>
    </div>

    <a class="text" :href="pocLink" @click="checkout()">Powered by PoC</a>
  </div>
</template>

<script>
export default {
  name: "FirstSection",
  data(){
    return{
      pocLink:"",
    }
  },
  computed: {
    sectionStyle() {
      //图片比例5:2
      let height = (0.4*document.body.clientWidth)/100;
      return {height: `${height}rem`};
    },
  },
  methods:{
    publishProduct(){
      let isUserLogin = this.$store.state.loginStatus;
      if (isUserLogin){
        this.$router.push({path: "/product/release"}).catch(()=>{});
      }else {
        this.$bus.$emit("USER_LOGIN_EVENT")
      }
    },
    checkout(){
      this.$router.push({path: "/product/checkout"}).catch(()=>{});
    },
  },
}
</script>

<style lang="scss" scoped>
.first-section{
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #007CFF;
  position: relative;
  //padding-top: 0.6rem;

  .banner{
    width: 100%;
    object-fit: cover;
  }

  .slogan{
    position: absolute;
    top: 2rem;
    left: 1rem;
    font-size: 0.4rem;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 0.5rem;
    display: flex;
    flex-direction: column;

    .divider{
      width: 0.7rem;
      height: 0.05rem;
      margin-top: 0.4rem;
      background: #FFFFFF;
    }

    .button{
      display: flex;
      flex-direction: column;
      cursor: pointer;
      width:fit-content;
      margin-top: 0.3rem;
      padding: 0 0.3rem;
      background: white;
      height: 0.6rem;
      border-radius: 0.6rem;
      color: #007CFF;
      text-align: center;
      justify-content: center;
      line-height: 0.3rem;
      font-size: 0.25rem;
      font-weight: bold;
    }
  }

  .text{
    position: absolute;
    bottom: 0.1rem;
    right: 0.2rem;
    font-size: 0.14rem;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.18rem;
  }
}
</style>
