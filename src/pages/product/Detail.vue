<template>
  <div class="product-detail">
    <div v-if="productDetail" class="content">

      <div class="left-section">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in productImages" :key="index">
              <img class="product-image" :src="item" alt=""/>
            </div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <div class="right-section">
        <p class="name">{{productDetail.goodsTitle}}</p>

        <div class="info-section">
          <div class="owner">
            <img
                v-if="false"
                class="image"
                src="../../assets/images/home/close.svg"
                alt=""/>

            <div class="info">
              <p class="owner-name">Owner</p>
              <div class="owner-address toe">{{productDetail.ownerAddress}}</div>
            </div>
          </div>

          <div class="owner" style="margin-left: 0.2rem">
            <img
                v-if="false"
                class="image"
                src="../../assets/images/home/close.svg"
                alt=""/>

            <div class="info">
              <p class="owner-name">NFT Address</p>
              <div class="owner-address toe">{{productDetail.goodsNftAddress}}</div>
            </div>
          </div>
        </div>

        <p class="description">
          {{productDetail.goodsDetailsIntro}}
        </p>


        <div class="button-section">
          <div class="button buy" @click="buy">${{productDetail.goodsSalePrice}} Buy</div>
          <div class="button join-group" @click="group">Group Buy</div>
          <div class="button distribution" @click="distribution">Become a Distributor</div>
        </div>

        <div class="group-detail">
          <div class="label1">Available Groups:</div>
          <ul v-if="productDetail.progressGroupList && productDetail.progressGroupList.length">
            <li v-for="(item,index) in productDetail.progressGroupList" :key="index">
              <div class="line"></div>
              <div style="display: flex;">
                <el-image class="user-avatar" :src="item.userAvatar" alt=""></el-image>

                <div class="group-info">
                  <div class="group-title">{{userNameFilter(item.nickName)}} initiated a group! Come on!</div>
                  <div class="left-amount">Remaining number of participants:{{item.grouponPeopleLimit - item.grouponPeople}}</div>
                </div>
              </div>

              <div class="right-side">
                <div class="count-down">
                  <span>Countdown：</span>
                  <CountDown :leftTime="item.taskEndTimeMillisecond"></CountDown>
                </div>
                <div class="join-button" @click="showGroupDialog(item)">Join</div>
              </div>
            </li>
          </ul>
          <el-empty v-else description="No groups available now"></el-empty>
        </div>

        <div class="main-title" style="margin-top: 0.2rem;">DAO Perspective</div>
        <div class="graph-layout">
          <div style="position: absolute;right: 0.2rem;top: 0.2rem;">
            <div style="display: flex;align-items: center;" class="main-text-small">
              <span style="width: 1.5rem;text-align: right;">Participated DAO:</span>
              <div style="width: 0.2rem;height: 0.15rem;box-shadow: 0 0 5px #FA3B00;border-radius: 0.03rem;margin-left: 0.05rem;"></div>
            </div>
            <div style="display: flex;align-items: center;margin-top: 0.05rem;" class="main-text-small">
              <span style="width: 1.5rem;text-align: right;">Current DAO:</span>
              <div style="width: 0.2rem;height: 0.15rem;background:#827BFA;border-radius: 0.03rem;margin-left: 0.05rem;"></div>
            </div>
          </div>
          <dao-tree v-if="treeData&&treeData.length" style="margin-top: 0.2rem;" :data="treeData" @onNodeClick="daoDetail"></dao-tree>
          <el-empty v-else description="No related DAOs yet"></el-empty>
        </div>

        <div class="product-detail-tab" v-if="false">
          <Tabs v-model="activeName" @tab-click="handleTabClick">
            <TabPanel label="团购" name="group" style="">

              <div v-if="productDetail.grouponRulesDto" style="display: flex;margin-top: 0.2rem;">

                <div class="content-section">
                  <div class="form">
                    <span class="label">团购价:</span><span class="value">￥{{productDetail.grouponRulesDto.price}}</span>
                  </div>
                  <div class="form">
                    <span class="label">成团最少人数:</span><span class="value">{{productDetail.grouponRulesDto.participantsMin}}</span>
                  </div>
                  <div class="form">
                    <span class="label">成团最大人数:</span><span class="value">{{productDetail.grouponRulesDto.participantsMax}}</span>
                  </div>
                  <div class="form">
                    <span class="label">团购有效期:</span><span class="value">{{productDetail.grouponRulesDto.expirationDay}}天</span>
                  </div>
                </div>

                <div class="content-section" style="margin-left: 0.2rem">
                  <div class="form">
                    <span class="label">砍价人奖励CCP数量:</span><span class="value">{{productDetail.grouponRulesDto.haggleRewardAmount}}</span>
                  </div>
                </div>
              </div>
              <el-empty v-else description="暂无团购信息"></el-empty>

            </TabPanel>
            <TabPanel label="分销" name="distribution" style="">
              <div v-if="productDetail.distributionRulesDto" style="display: flex;margin-top: 0.2rem;">

                <div class="content-section">
                  <div class="form">
                    <span class="label">分销价格:</span><span class="value">￥{{productDetail.distributionRulesDto.distributionPrice}}</span>
                  </div>
                  <div class="form">
                    <span class="label">最少数量:</span><span class="value">{{productDetail.distributionRulesDto.distributionMin}}</span>
                  </div>
                  <div class="form">
                    <span class="label">有效期:</span><span class="value">{{productDetail.distributionRulesDto.expirationDay}}天</span>
                  </div>
                </div>

                <div class="content-section" style="margin-left: 0.2rem">
                  <div class="form">
                    <span class="label">完成奖励占销售额:</span><span class="value">{{decimalToPercentage(productDetail.distributionRulesDto.distributionRewardRatio)}}</span>
                  </div>
                  <div class="form">
                    <span class="label">未完成扣除保证金比例:</span><span class="value">{{decimalToPercentage(productDetail.distributionRulesDto.penaltyRatio)}}</span>
                  </div>
                  <div class="form">
                    <span class="label">质押保证金数量:</span><span class="value">{{productDetail.distributionRulesDto.pledgeAmount}} CCP</span>
                  </div>
                </div>
              </div>
              <el-empty v-else description="暂无分销信息"></el-empty>
            </TabPanel>
          </Tabs>
        </div>

      </div>
    </div>

    <JoinGroupDialog
        v-if="joinCurrentGroup && productDetail"
        :dialogShow="joinGroupDialogShow"
        :reward="productDetail.grouponRulesDto.haggleRewardAmount"
        :price="productDetail.grouponRulesDto.price"
        :groupInfo="joinCurrentGroup"
        @close="joinGroupDialogShow = false"
        @haggle="haggle"
        @groupBuy="groupBuy">
    </JoinGroupDialog>

  </div>
</template>

<script>
import Tabs from "@/components/tabs/Tabs.vue";
import TabPanel from "@/components/tabs/TabPanel.vue";
import CountDown from "@/components/CountDown.vue";
import {preLoad, scrollToY} from "@/utils";
import JoinGroupDialog from "./JoinGroupDialog.vue";
import {daoTotalDetails, getProductDetail, haggle} from "@/api";
import {name_filter, number_util} from "@/mixins/mixin";
import {Message} from "element-ui";

import 'swiper/dist/css/swiper.css'
import Swiper from "swiper"

import DaoTree from "@/components/DaoTree";

export default {
  name: "DetailPage",
  components: {
    DaoTree,
    Tabs,
    TabPanel,
    CountDown,
    JoinGroupDialog,
  },
  mixins: [number_util,name_filter],
  data() {
    return {
      activeName: 'group',
      joinGroupDialogShow:false,
      joinCurrentGroup:null,
      productDetail:null,
      productImages:[],
      productImage0:"",
      daoNo:"",
      treeData:[],
    };
  },
  watch:{
    productDetail:{
      handler(val){
        this.$nextTick(()=>{
          //Swiper必须在数据改变后再初始化，否则不生效
          new Swiper(".swiper-container", {
            direction: 'horizontal',
            loop: true,
            observer:true,
            observeParents:true,
            pagination: {
              el: ".swiper-pagination",
              type: "bullets",
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        })
      },
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.taskId = this.$route.query.taskId
    this.preloadLoading();
    this.getProductDetail();
  },
  methods: {
    preloadLoading(){
      let loading_gif = "https://d288ikp9ge2crg.cloudfront.net/mvp/website/home/nft-loading.gif"
      preLoad(loading_gif);
    },
    getProductDetail(){
      let requestBody={"taskId": this.taskId}
      getProductDetail(requestBody).then(res =>{
        console.log(JSON.stringify(res, null, 4))
        this.productDetail = res.data;
        this.daoNo = this.productDetail.daoNo;
        this.getTotalDaoDetails();

        let productImageObject = JSON.parse(this.productDetail.goodsImageJson)
        console.log("images == "+JSON.stringify(productImageObject))

        Object.keys(productImageObject).forEach((key) => {
          this.productImages.push(productImageObject[key])
        })
        this.productImage0 = productImageObject.file0;
      })
    },
    getTotalDaoDetails(){
      let requestBody = {daoNo: this.daoNo};
      daoTotalDetails(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res.returnCode === "0000" && res.data){
          this.treeData = res.data.daoViewRootDto.nodes;
        }
      })
    },
    daoDetail(daoData){
      this.$router.push({
        path: "/dao",
        query: {
          daoNo: daoData.id,
        },
      })
    },
    showGroupDialog(groupItem){
      this.joinGroupDialogShow = true;
      this.joinCurrentGroup = groupItem;
    },
    handleTabClick(index) {
      console.log(index);
    },
    buy(){//直接购买
      sessionStorage.setItem(this.productDetail.taskId,JSON.stringify(this.productDetail));
      this.$router.push({
        path: "/product/buy",
        query: {
          taskId: this.productDetail.taskId,
        },
      })
    },
    group(){//发起拼团
      if (this.productDetail.grouponRulesDto){
        sessionStorage.setItem(this.productDetail.taskId,JSON.stringify(this.productDetail));
        this.$router.push({
          path: "/product/group",
          query: {
            taskId: this.productDetail.taskId,
          },
        })
      }else {
        Message.error("The current product cannot initiate group purchase");
      }
    },
    distribution(){//发起分销
      if (this.productDetail.distributionRulesDto){
        sessionStorage.setItem(this.productDetail.taskId,JSON.stringify(this.productDetail));
        this.$router.push({
          path: "/product/distribution",
          query: {
            taskId: this.productDetail.taskId,
          },
        })
      }else {
        Message.error("The current product cannot initiate distribution");
      }
    },
    groupBuy(groupId){//拼团购买
      this.joinGroupDialogShow = false
      sessionStorage.setItem(this.productDetail.taskId,JSON.stringify(this.productDetail));
      this.$router.push({
        path: "/product/buy",
        query: {
          taskId: this.productDetail.taskId,
          type:"group",
          groupId:groupId
        },
      })
    },
    haggle(taskId){//帮砍价
      this.joinGroupDialogShow = false
      let requestBody={"taskId": taskId}
      haggle(requestBody).then(res =>{
        console.log(JSON.stringify(res, null, 4))
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  padding-top: 0.8rem;
  padding-bottom: 1.5rem;
  width: 12rem;
  margin: 0 auto;

  .main-title {
    font-size: 0.18rem;
    font-weight: 500;
    color: #1F1F2C;
    line-height: 0.25rem;
  }

  .main-text-small {
    font-size: 0.12rem;
    font-weight: 400;
    color: #58606A;
    line-height: 0.16rem;
  }


  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;

    .left-section{

    }

    .right-section {
      display: flex;
      flex-direction: column;
      width: 6rem;

      .name {
        font-size: 0.3rem;
        font-weight: bold;
        color: #1F1F2C;
        line-height: 0.4rem;
      }

      .info-section {
        display: flex;
        width: 100%;

        .owner {
          list-style: none;
          background: #FFFFFF;
          box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
          border-radius: 0.12rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0.1rem;
          margin-top: 0.15rem;
          width: 50%;

          img {
            width: 0.44rem;
            height: 0.44rem;
            background: #EBEBEB;
            border-radius: 0.1rem;
          }

          .info {
            margin-left: 0.12rem;
            overflow: hidden;

            .owner-name {
              font-size: 0.13rem;
              font-weight: 400;
              color: #8A8AA0;
              line-height: 0.2rem;
            }

            .owner-address {
              font-size: 0.15rem;
              font-weight: bold;
              color: #1F1F2C;
              line-height: 0.22rem;
              margin-top: 0.02rem;
              width: 2rem;
            }
          }
        }
      }

      .description {
        width: 100%;
        font-size: 0.14rem;
        font-weight: 400;
        color: #7A798A;
        line-height: 0.22rem;
        margin-top: 0.16rem;
      }

      .button-section{
        width: 100%;
        margin-top: 0.3rem;
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

          &.distribution{
            background: linear-gradient(313deg, #5142FC 0%, #827BFA 100%);
            margin-left: 0.2rem;
          }
        }
      }

      .group-detail{
        margin-top: 0.3rem;
        .label1{
          font-size: 0.16rem;
          font-weight: bold;
          color: #1F1F2C;
          line-height: 0.2rem;
          margin-top: 0.2rem;
        }

        ul{
          height: 2.1rem;
          pointer-events: all;
          overflow-x: hidden;
          overflow-y: scroll;
          background: #FFFFFF;
          box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
          border-radius: 0.12rem;
          margin-top: 0.12rem;

          &::-webkit-scrollbar {
            width: 5px;
            height: 5px;
            background-color: transparent;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #f0f0f0;
          }

          li{
            list-style: none;
            display: flex;
            justify-content: space-between;
            padding: 0.12rem 0;
            align-items: center;
            position: relative;
            height: 0.46rem;

            .line{
              height: 0.5px;
              background: #EBEBEB;
              width: 100%;
              position: absolute;
              bottom: 0;
              margin-left: 0.66rem;
            }

            .user-avatar{
              margin-left: 0.1rem;
              width: 0.44rem;
              height: 0.44rem;
              background: #EBEBEB;
              border-radius: 0.1rem;
            }

            .group-info{
              margin-left: 0.12rem;
              display: flex;
              flex-direction: column;

              .group-title{
                font-size: 0.15rem;
                font-weight: bold;
                color: #1F1F2C;
                line-height: 0.22rem;
              }

              .left-amount{
                font-size: 0.13rem;
                font-weight: 400;
                color: #7A798A;
                line-height: 0.2rem;
              }
            }

            .right-side{
              display: flex;
              align-items: center;
              .count-down{
                display: flex;
                font-size: 0.13rem;
                font-weight: 400;
                color: #7A798A;
                line-height: 0.2rem;
              }
              .join-button{
                margin: 0 0.1rem;
                height: 0.3rem;
                background: #007CFF;
                border-radius: 0.06rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #FFFFFF;
                font-size: 0.15rem;
                font-weight: bold;
                line-height: 0.22rem;
                padding: 0 0.12rem;
                pointer-events: auto;
                cursor: pointer;
              }
            }
          }
        }
      }

      .product-detail-tab {
        margin-top: 0.3rem;
        height: 5rem;

        .content-section {
          width: 50%;
          padding: 0 0.16rem 0.16rem;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
          border-radius: 0.08rem;
          .form {
            display: flex;
            align-items: center;
            margin-top: 0.12rem;

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
        }

        .label1{
          font-size: 0.16rem;
          font-weight: bold;
          color: #1F1F2C;
          line-height: 0.2rem;
          margin-top: 0.2rem;
        }

        ul{
          height: 2.1rem;
          pointer-events: all;
          overflow-x: hidden;
          overflow-y: scroll;
          background: #FFFFFF;
          box-shadow: 0 0.04rem 0.1rem 0 rgba(236,236,236,0.5);
          border-radius: 0.12rem;
          margin-top: 0.12rem;

          &::-webkit-scrollbar {
            width: 5px;
            height: 5px;
            background-color: transparent;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #f0f0f0;
          }

          li{
            list-style: none;
            display: flex;
            justify-content: space-between;
            padding: 0.12rem 0;
            align-items: center;
            position: relative;
            height: 0.46rem;

            .line{
              height: 0.5px;
              background: #EBEBEB;
              width: 100%;
              position: absolute;
              bottom: 0;
              margin-left: 0.66rem;
            }

            .user-avatar{
              margin-left: 0.1rem;
              width: 0.44rem;
              height: 0.44rem;
              background: #EBEBEB;
              border-radius: 0.1rem;
            }

            .group-info{
              margin-left: 0.12rem;
              display: flex;
              flex-direction: column;

              .group-title{
                font-size: 0.15rem;
                font-weight: bold;
                color: #1F1F2C;
                line-height: 0.22rem;
              }

              .left-amount{
                font-size: 0.13rem;
                font-weight: 400;
                color: #7A798A;
                line-height: 0.2rem;
              }
            }

            .right-side{
              display: flex;
              align-items: center;
              .count-down{
                display: flex;
                font-size: 0.13rem;
                font-weight: 400;
                color: #7A798A;
                line-height: 0.2rem;
              }
              .join-button{
                margin: 0 0.1rem;
                height: 0.3rem;
                background: #007CFF;
                border-radius: 0.06rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #FFFFFF;
                font-size: 0.15rem;
                font-weight: bold;
                line-height: 0.22rem;
                padding: 0 0.12rem;
                pointer-events: auto;
                cursor: pointer;
              }
            }
          }
        }
      }

      .graph-layout{
        position: relative;
        width: 6rem;
        align-items: center;
        margin: 0.15rem auto 0;
        border-radius:0.2rem;
        border: 1px #EBEBEB solid;
      }
    }
  }
}

.swiper-container{
  width: 5rem;
  height: 5rem;
  background: #EBEBEB;
  border-radius: 0.2rem;
  font-size: 0.14rem;
  .swiper-wrapper{
    .swiper-slide{
      .product-image {
        width: 5rem;
        height: 5rem;
        //background: #EBEBEB;
        //border-radius: 0.2rem;
        object-fit: cover;
        //border: 1px solid #F8F8F8;
      }
    }
  }
}
</style>
