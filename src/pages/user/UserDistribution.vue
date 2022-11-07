<template>
  <div class="distribution-panel">

    <vxe-table
        style="margin-left: 0.3rem;margin-right: 0.3rem;margin-top: 0.36rem;"
        class="table-style"
        header-cell-class-name="table-header"
        cell-class-name="table-cell"
        border
        show-header-overflow
        show-overflow
        :align="allAlign"
        :row-config="{isHover: true,height: 100}"
        :data="userDistributionDtoList">

      <template #empty>
        <el-empty description="No products for sale currently"></el-empty>
      </template>

      <vxe-column field="goodsTitle" title="Product Name" width="34%">
        <template #default="{ row }">
          <div style="display: flex;align-items: center;flex-direction:row;text-align: left;white-space: normal;">
            <img :src="row.goodsImage" alt="" style="width: 0.34rem;height: 0.34rem;object-fit: cover;">
            <div class="toe2" style="margin-left: 0.12rem;text-align: left">{{row.goodsTitle}}</div>
          </div>
        </template>
      </vxe-column>

<!--      <vxe-column field="grouponPrice" title="团购信息" width="14%">-->
<!--        <template #default="{ row }">-->
<!--          <div style="display: flex;flex-direction:column;text-align: left;">-->
<!--            <div>团购价:${{row.grouponPrice}}</div>-->
<!--            <div>成团最少人数:{{row.people}}</div>-->
<!--            <div>成团最多人数:{{row.peopleLimit}}</div>-->
<!--            <div>成团数量:{{row.dealQuantity}}</div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </vxe-column>-->

      <vxe-column field="grouponPrice" title="Information" width="14%">
        <template #default="{ row }">
          <div style="display: flex;flex-direction:column;text-align: left;">
            <div>Price:${{row.distributionPrice}}</div>
            <div>Quantity:{{row.dealQuantity}}</div>
            <div>Progress:<span style="color: #CF3135;font-weight: 500;">{{decimalToPercentage(row.dealQuantity/row.distributionMin)}}</span></div>
          </div>
        </template>
      </vxe-column>

      <vxe-column field="nftAssetsLink" title="NFT Assets Address" width="24%">
        <template #default="{ row }">
          <div style="display: flex;align-items: center;white-space:normal;">
            <a v-if="row.nftAssetsLink" class="toe2" :href="row.nftAssetsLink" target="_blank">
              {{row.nftAssetsLink}}
            </a>
            <div v-else>No NFT assets yet</div>
          </div>
        </template>

      </vxe-column>

      <vxe-column field="endTime" title="Start/End Time" width="16%">
        <template #default="{ row }">
          <div>{{formatTimeToMinute(row.startTime)}}</div>
          <div>{{formatTimeToMinute(row.endTime)}}</div>
        </template>
      </vxe-column>

      <vxe-column field="taskStatus" title="Total Info" width="12%">
        <template #default="{ row }">
          <div style="display: flex;flex-direction:column; align-items: center;justify-content: center">
<!--            <a class="toe" :href="row.distributionLink" style="width: 100%;">-->
<!--              {{row.distributionLink}}-->
<!--            </a>-->
            <div class="button" style="margin-top: 0.04rem" @click="goToProductDetail(row.taskId)">Total Info</div>
          </div>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {getUserDistributionInfo} from "@/api";
import {number_util, time_filter} from "@/mixins/mixin";

export default {
  name: "UserDistribution",
  mixins: [time_filter,number_util],
  data () {
    return {
      allAlign: 'center',
      userDistributionDtoList: [],
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.getUserDistributionInfo()
  },
  methods:{
    getUserDistributionInfo(){
      let requestBody={"pageNum": 1,"pageSize": 40}
      getUserDistributionInfo(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res) {
          this.userDistributionDtoList = res.data.userDistributionDtoList
        }
      })
    },
    goToProductDetail(taskId){
      this.$router.push({
        path: "/product/detail",
        query: {
          taskId: taskId,
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.distribution-panel {
  display: flex;
  flex-direction: column;

  .button{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 0.1rem;
    height: 0.24rem;
    background: #007CFF;
    border-radius: 0.04rem;
    font-size: 0.11rem;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.14rem;
  }

  a{
    text-decoration:underline;
    color: #7A798A;
  }
}

::v-deep(.table-style){

}

::v-deep(.table-header){
  background: #E9F1FF;
  color: #020027;
  height: 0.36rem!important;
}

::v-deep(.table-cell){
  font-size: 0.11rem!important;
  font-weight: 400!important;
  color: #020027!important;
  line-height: 0.18rem!important;
  padding: 0 0 !important;
}

::v-deep(.vxe-cell){
  //padding: 0 0 !important;
}
</style>
