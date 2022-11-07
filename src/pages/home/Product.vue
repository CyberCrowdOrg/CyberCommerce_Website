<template>
  <div class="product-section">
    <div class="title">
      Hot Sale
    </div>

    <div class="divider"></div>

    <ul>
      <li @click="goToProductDetail(item)" v-for="item in productList" :key="item.goodsId">
        <img
            ref="product_image"
            class="product-image"
            :src="item.goodsImages"
            alt=""/>

        <div class="product-name">{{item.goodsTitle}}</div>

        <div class="share">
          <img src="../../assets/images/home/share.png" alt="">
          <div class="toe2" style="margin-left: 0.08rem">{{item.goodsIntro}}</div>
        </div>

        <div class="owner">
          <div class="toe" style="margin-right: 0.08rem">{{item.userNickName}}</div>
          <img class="avatar" :src="item.userAvatar" alt="">
        </div>

        <div v-if="false" class="nft-link">
          <span class="link-title">NFT Address:</span>
          <a class="toe2" href="https://testnets.opensea.io/assets/rinkeby/0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656/5011947602614082220219306748409903063839973589903363150495075472668578807809">
            <span>https://testnets.opensea.io/assets/rinkeby/0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656/5011947602614082220219306748409903063839973589903363150495075472668578807809</span>
          </a>
        </div>

        <div class="distributor" v-if="item.taskType === 'false'">
          <span class="text">Distribution</span>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import {getProductList} from "@/api";

export default {
  name: "ProductSection",
  data() {
    return {
      productList:[]
    }
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList(){
      let requestBody={"pageNum": 1,"pageSize": 12}
      getProductList(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        this.productList = res.data.baseGoodsDtos;
      })
    },
    goToProductDetail(item){
      this.$router.push({
        path: "/product/detail",
        query: {
          taskId: item.taskId,
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-section {
  width: 12rem;
  margin: 0 auto;
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

  ul {
    list-style: none;
    margin-top: 0.1rem;
    width: 100%;
    //display: flex;

    li:nth-child(4n) {
      margin-right: 0;
    }

    li {
      float: left;
      display: flex;
      margin-top: 0.4rem;
      flex-direction: column;
      width: 2.3rem;
      height: 3.6rem;
      margin-right: 0.4rem;
      background: #FFFFFF;
      box-shadow: 0 0.03rem 0.16rem 0 rgba(47, 83, 109, 0.1200);
      border-radius: 0.2rem;
      padding: 0.2rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      .product-image {
        border-radius: 0.2rem;
        object-fit: cover;
        width: 2.28rem;
        height: 2.28rem;
        border: 1px #EBEBEB solid;
      }

      .product-name{
        width: 2.3rem;
        font-size: 0.18rem;
        font-weight: bold;
        color: #1F1F2C;
        line-height: 0.26rem;
        margin-top: 0.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .share{
        display: flex;
        align-items: center;
        margin-top: 0.14rem;
        font-size: 0.13rem;
        font-weight: 400;
        color: #7A798A;
        line-height: 0.2rem;

        img{
          width: 0.2rem;
          height: 0.2rem;
          background: #EBEBEB;
          border-radius: 0.1rem;
          display: block;
          padding: 0.1rem;
        }
      }

      .owner{
        justify-content: flex-end;
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        font-size: 0.1rem;
        font-weight: 400;
        color: #1F1F2C;
        line-height: 0.14rem;

        .avatar{
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 0.2rem;
          object-fit: cover;
        }
      }

      .nft-link{
        display: flex;
        width: 2.3rem;
        flex-direction: column;
        margin-top: 0.1rem;
        font-size: 0.12rem;
        font-weight: 400;
        color: #7A798A;
        line-height: 0.18rem;

        .link-title{
          white-space: nowrap;
        }

        a{
          text-decoration:underline;
          color: #7A798A;
        }
      }

      .distributor{
        position: absolute;
        right: -0.5rem;
        top: -0.5rem;
        background: #0F7BFF;
        width: 1rem;
        height: 1rem;
        rotate: 45deg;
        color: white;
        font-size: 0.12rem;

        .text{
          position: absolute;
          bottom: 0.05rem;
          width: 100%;
          display: block;
          text-align: center;
        }
      }
    }
  }
}
</style>
