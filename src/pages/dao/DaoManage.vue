<template>
  <div class="dao-page" v-if="daoDetail">

    <div class="left">

      <p class="main-title" style="margin-right: 0.2rem">{{daoDetail.userDaoDto.daoName}}</p>
      <p class="main-text" style="margin-top: 0.1rem">{{ 'Organizer:'+addressFilter(daoDetail.userDaoDto.userWalletAddr) }}</p>
      <p class="main-text-small" style="margin-top: 0.1rem">Menmbers：{{daoDetail.userDaoDto.memberNumber}}</p>
      <el-image class="avatar" :src="daoDetail.userDaoDto.userAvatar" alt=""></el-image>
      <div class="button" style="margin-top: 0.1rem" @click="showCreateProposalDialog()">Proposal</div>
      <input ref="upload_input" style="width: 0;height: 0;" name="nft" type="file" accept=".png,.jpg,.jpeg" @change="onNFTImageChange()" />
      <div class="button nft" style="margin-top: 0.1rem" @click="uploadNFT()">Mint NFT</div>

    </div>

    <div class="right">

      <div class="main-title" style="margin-top: 0.2rem">DAO Rules</div>
      <div class="description main-text">
        <div style="margin: 0.2rem;white-space: pre-line;">
          {{daoDetail.grouponRules}}
        </div>
      </div>

      <div class="main-title">DAO Perspective</div>
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
        <dao-tree style="margin-top: 0.2rem;" :data="treeData"></dao-tree>
      </div>

      <div class="main-title" style="margin-top: 0.2rem">NFT Assets</div>
      <div class="nft-layout main-text">
        <ul v-if="daoNftAssetsDtoList && daoNftAssetsDtoList.length">
          <li v-for="(item,index) in daoNftAssetsDtoList" :key="index" @click="nftClicked(item)">
            <img class="image" :src="item.nftFilePath" :alt="item.nftName">
            <div class="nft-name toe">{{item.nftName}}</div>
            <div class="toe2 main-text-small" style="margin-top: 0.03rem">{{item.nftDescription}}</div>
          </li>
        </ul>
        <el-empty v-else description="No NFT assets yet"></el-empty>
      </div>

      <div class="dao-proposal">
        <div class="main-title" style="">Total Proposals</div>
        <ul v-if="proposalList && proposalList.length">
          <li v-for="item in proposalList" :key="item.proposalNo">
            <div style="display: flex;justify-content: space-between;align-items: center;">
              <p class="main-text toe">Sponsor:{{item.userAddr}}</p>
            </div>

            <p class="main-title toe" style="margin-top: 0.12rem;">{{item.proposalTitle}}</p>

            <p class="main-content toe2" style="margin-top: 0.12rem;">{{item.proposalContext}}</p>

            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 0.12rem;">
              <div style="display: flex;flex-direction: column">
<!--                <p class="main-text-small">发起时间: 2022–07-28 16:58:20</p>-->
                <p class="main-text-small">End Time: {{formatTimeToSecond(item.proposalEndTime)}}</p>
              </div>

              <div style="display: flex;flex-direction: row;">
                <div class="button approve" @click="showDaoManageDialog('YES')">YES</div>
                <div class="button reject" @click="showDaoManageDialog('NO')">NO</div>
<!--                <div class="button abstain" @click="showDaoManageDialog('弃权')">弃权</div>-->
              </div>
            </div>
          </li>
        </ul>
        <el-empty v-else description="No proposals yet"></el-empty>
      </div>

    </div>

    <DaoManageDialog
        :dialogShow="daoManageDialogShow"
        :vote="vote"
        @close="daoManageDialogShow = false"
        @confirm="daoManageDialogShow = false"
    ></DaoManageDialog>

    <DaoNFTDialog
        :dialogShow="daoNFTDialogShow"
        :imageUrl="nftImageUrl"
        @close="daoNFTDialogShow = false"
        @confirm="createDaoNFT()"
    ></DaoNFTDialog>

    <CreateProposal
        :dialogShow="createProposalDialogShow"
        :daoNo="daoNo"
        @close="createProposalDialogShow = false"
        @onSuccess="onCreateProposalSuccess()"
    ></CreateProposal>
  </div>
</template>

<script>
import {getCurrentTimeStamp, scrollToY} from "@/utils";
import DaoManageDialog from "./DaoManageDialog.vue";
import CreateProposal from "./CreateProposal.vue";
import {createDaoNFT, createDaoProposal, daoDetails, daoTotalDetails} from "@/api";
import {address_filter, time_filter} from "@/mixins/mixin";
import DaoNFTDialog from "@/pages/dao/DaoNFTDialog";
import {Loading} from "element-ui";
import DaoTree from "@/components/DaoTree";

export default {
  name: "DaoManage",
  mixins: [address_filter,time_filter],
  components: {
    DaoTree,
    DaoNFTDialog,
    DaoManageDialog,
    CreateProposal
  },
  data() {
    return {
      daoManageDialogShow:false,
      daoNFTDialogShow:false,
      createProposalDialogShow:false,
      vote:'',
      daoNo:"",
      daoDetail: null,
      treeData:[],
      proposalList: [],
      daoNftAssetsDtoList: [],
      nftFile:null,
      nftImageUrl:"",
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.daoNo = this.$route.query.daoNo;
    this.getDaoDetails();
  },
  methods: {
    showDaoManageDialog(vote){
      this.vote = vote;
      this.daoManageDialogShow = true;
    },
    showCreateProposalDialog(){
      this.createProposalDialogShow = true;
    },
    onCreateProposalSuccess(){
      this.createProposalDialogShow = false;
      this.getDaoDetails();
    },
    uploadNFT(){
      this.$refs.upload_input.click();
    },
    onNFTImageChange(){
      let file = this.$refs.upload_input.files[0];
      if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg'){
        console.log('不是有效的图片文件！');
        return;
      }
      this.nftFile = file;
      console.log(this.nftFile)
      this.nftImageUrl = window.URL.createObjectURL(this.nftFile);
      this.daoNFTDialogShow = true;
    },
    createDaoNFT(){
      this.daoNFTDialogShow = false;
      let formData = new FormData();
      formData.append('daoNo', this.daoNo);
      formData.append('nft_'+this.nftFile.name, this.nftFile)
      this.showCustomLoading()
      createDaoNFT(formData).then(res => {
        console.log(JSON.stringify(res, null, 4))
        this.hideCustomLoading()
        this.getDaoDetails();
      }).catch(error => {
        this.hideCustomLoading();
        console.log("error",error)
      })
    },
    getDaoDetails(){
      let requestBody = {daoNo: this.daoNo};
      daoDetails(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res.returnCode === "0000" && res.data){
          this.daoDetail = res.data;
          this.treeData = res.data.daoViewRootDto.nodes;
          this.proposalList = res.data.daoProposalList;
          this.daoNftAssetsDtoList = res.data.daoNftAssetsDtoList;
        }
      })
    },
    nftClicked(item){
      window.open(item.nftMarketLink, '_blank')
    },
    showCustomLoading(){
      let text = "NFT minting...";
      this.customLoading = Loading.service(
          {
            fullscreen: true,
            spinner:"nft-spinner",
            text:text,
            customClass:"custom-nft-spinner"
          }
      )
    },
    hideCustomLoading(){
      if (this.customLoading){
        // 以服务的方式调用的 Loading 需要异步关闭
        this.$nextTick(() => {
          this.customLoading.close();
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dao-page {
  font-size: 16px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 0.8rem;
  padding-bottom: 1.5rem;
  width: 10rem;
  margin: 0 auto;

  .left{
    width: 2.1rem;
    position:relative;
    display:flex;
    flex-direction: column;
    padding: 0.2rem;
    border-radius:0.2rem;
    border: 1px #EBEBEB solid;
    margin-top: 0.2rem;
  }

  .right{
    display: flex;
    flex-direction: column;
    width: 7rem;
  }

  .button{
    width: 100%;
    height: 0.3rem;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 0.14rem;
    color: #FFFFFF;
    cursor: pointer;
    background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);

    &.nft{
      background: linear-gradient(313deg, #5142FC 0%, #827BFA 100%);
    }
  }

  .description{
    width: 7rem;
    border: 1px #EBEBEB solid;
    border-radius: 0.1rem;
    margin: 0.15rem auto 0.2rem;
  }

  .nft-layout{
    width: 7rem;
    //border: 1px #EBEBEB solid;
    //border-radius: 0.1rem;
    margin: -0.05rem auto 0.2rem;

    ul{
      list-style: none;
      width: 100%;

      li:nth-child(4n) {
        margin-right: 0;
      }

      li{
        float: left;
        display: flex;
        margin-top: 0.2rem;
        flex-direction: column;
        width: 1.38rem;
        padding: 0.1rem;
        margin-right: 0.2rem;
        border: 1px #EBEBEB solid;
        border-radius: 0.1rem;
        cursor: pointer;

        .image {
          border-radius: 0.1rem;
          object-fit: cover;
          width: 1.38rem;
          height: 1.38rem;
        }

        .nft-name{
          margin-top: 0.1rem;
          font-size: 0.14rem;
          font-weight: 500;
          color: #1F1F2C;
          line-height: 0.18rem;
        }
      }
    }
  }

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

  .avatar{
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.3rem;
    object-fit: cover;
  }

  .graph-layout{
    position: relative;
    width: 7rem;
    align-items: center;
    margin: 0.15rem auto 0;
    border-radius:0.2rem;
    border: 1px #EBEBEB solid;
  }

  .dao-proposal{
    display: flex;
    flex-direction: column;
    padding-bottom: 1.5rem;
    width: 7rem;
    margin: 0 auto;

    ul{
      list-style: none;
      li{
        display: flex;
        flex-direction: column;
        border: 1px #EBEBEB solid;
        border-radius: 0.1rem;
        padding: 0.2rem;
        margin-top: 0.15rem;
        cursor: pointer;

        .button{
          height: 0.35rem;
          border-radius: 0.56rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 0.14rem;
          color: #FFFFFF;
          cursor: pointer;
          padding: 0 0.2rem;

          &.approve{
            background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);
          }

          &.reject{
            background: linear-gradient(313deg, #0F7BFF 0%, #5995DF 100%);
            margin-left: 0.12rem;
          }

          &.abstain{
            background: linear-gradient(313deg, #5142FC 0%, #827BFA 100%);
            margin-left: 0.12rem;
          }
        }
      }
    }
  }
}

</style>
