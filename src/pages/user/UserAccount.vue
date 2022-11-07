<template>
  <div class="account-panel">
    <p class="main-title" style="margin-top: 0.36rem;margin-left: 0.5rem">Wallet Assets:</p>

    <div class="content-section">
      <vxe-table
          style="margin-left: 0.5rem;margin-right: 0.5rem;margin-top: 0.16rem;"
          class="table-style"
          header-cell-class-name="table-header"
          cell-class-name="table-cell"
          border
          show-header-overflow
          show-overflow
          :align="allAlign"
          :row-config="{isHover: true,height: 36}"
          :data="cryptoAssetData">
        <vxe-column field="name" title="Coin" width="50%">
          <template #default="{ row }">

            <div style="display: flex;align-items: center;justify-content: center">
              <img :src="row.coinImageUrl" alt="" style="width: 0.18rem;height: 0.18rem;margin-right: 0.06rem;">
              {{row.coinName}}
            </div>

          </template>
        </vxe-column>
        <vxe-column field="balance" title="Balance" width="50%"></vxe-column>
      </vxe-table>
    </div>

    <p class="main-title" style="margin-top: 0.4rem;margin-left: 0.5rem">NFT Assets:</p>

    <div class="content-section">
      <vxe-table
          style="margin-left: 0.5rem;margin-right: 0.5rem;margin-top: 0.16rem;"
          class="table-style"
          header-cell-class-name="table-header"
          cell-class-name="table-cell"
          border
          show-header-overflow
          show-overflow
          :align="allAlign"
          :row-config="{isHover: true,height: 36}"
          :data="nftAssetData">
        <vxe-column field="contractAddr" title="NFT Contract Address" width="50%"></vxe-column>
        <vxe-column field="nftNo" title="NFT No." width="25%"></vxe-column>
        <vxe-column field="nftNumber" title="NFT Amount" width="25%"></vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {getAccountData} from "@/api";

export default {
  name: "AccountPage",
  data () {
    return {
      allAlign: 'center',
      cryptoAssetData: [],
      nftAssetData: [
        {
          "contractAddr": "0xbE71Be066A182715659aAef7e7b8E580ea9E9824", //NFT合约地址
          "nftNo": "#87666", //nft编号
          "nftNumber": 20, //nft 数量
          "nftName": "Praise of life" //nft名称
        },
        {
          "contractAddr": "0xbE71Be066A182715659aAef7e7b8E580ea9E9824",
          "nftNo": "#86999",
          "nftNumber": 12,
          "nftName": "Crime and punishment"
        }
      ],
      accountInfo:null
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.getAccountData();
  },
  methods:{
    getAccountData(){
      getAccountData().then(res => {
        console.log(JSON.stringify(res, null, 4))
        this.accountInfo = res.data;
        this.cryptoAssetData = res.data.walletBalanceResList;
        // this.nftAssetData = res.data.nftAssetsResList;
      })
    },
  }
}
</script>

<style lang="scss" scoped>

.account-panel{
  display: flex;
  flex-direction: column;

  .main-title {
    font-size: 0.18rem;
    font-weight: 500;
    color: #020027;
    line-height: 0.25rem;
  }

  .main-text {
    font-size: 0.12rem;
    font-weight: 400;
    color: #747474;
    line-height: 0.17rem;
  }

  .content-section {
    display: flex;
    flex-direction: column;

    .column-title{
      font-size: 0.14rem;
      font-weight: 500;
      color: #7A798A;
      line-height: 0.18rem;
    }
    .column-text{
      font-size: 0.12rem;
      font-weight: 400;
      color: #7A798A;
      line-height: 0.18rem;
      display: flex;
      align-items: center;

      .crypto-icon{
        height: 0.3rem;
        border-radius: 0.25rem;
        border:1px solid #7A798A;
      }
    }
  }
}

::v-deep(.table-style){

}

::v-deep(.table-header){
  background: #E9F1FF;
  color: #020027;
  height: 0.36rem!important;
}

</style>
