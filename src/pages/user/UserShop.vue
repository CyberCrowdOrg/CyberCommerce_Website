<template>
  <div class="shop-panel">

    <div style="width: 100%;margin-top: 0.3rem;height: 0.3rem;position: relative">
      <div class="publish-button" @click="publishProduct()">Publish Product</div>
    </div>

    <vxe-table
        style="margin-left: 0.3rem;margin-right: 0.3rem;margin-top: 0.1rem;"
        class="table-style"
        header-cell-class-name="table-header"
        cell-class-name="table-cell"
        border
        show-header-overflow
        show-overflow
        :align="allAlign"
        :row-config="{isHover: true,height: 100}"
        :data="goodsStoreDtos">
      <template #empty>
        <el-empty description=" ">
          <a style="cursor: pointer;" @click="publishProduct">No products for sale,publish now>></a>
        </el-empty>
      </template>
      <vxe-column field="goodsTitle" title="Product Name" width="30%">
        <template #default="{ row }">
          <div style="display: flex;align-items: center;white-space:normal;">
            <img :src="row.goodsImage" alt="" style="width: 0.34rem;height: 0.34rem;object-fit: cover;">
            <p class="toe2" style="margin-left: 0.12rem;text-align: left;">{{row.goodsTitle}}</p>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="grouponPrice" title="Group Info" width="18%">
        <template #default="{ row }">
          <div style="display: flex;flex-direction:column;text-align: left;white-space:normal;">
            <div>Group Price:${{row.grouponPrice || 0}}</div>
            <div>Minimum Members:{{row.grouponPeople}}</div>
            <div>Maximum Members:{{row.grouponPeopleLimit}}</div>
            <div>Group Numbers:{{row.grouponQuantity}}</div>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="distributionMin" title="Distribution" width="14%">
        <template #default="{ row }">
          <div style="display: flex;flex-direction:column;text-align: left;white-space:normal;">
            <div>Price:${{row.distributionPrice || 0}}</div>
            <div>Min Quantity:{{row.distributionMin}}</div>
            <div>Distributors:{{row.distributionQuantity}}</div>
          </div>
        </template>
      </vxe-column>

      <vxe-column field="dealQuantity" title="Sold" width="10%">

      </vxe-column>

      <vxe-column field="publishTime" title="Publish Time" width="16%">
        <template #default="{ row }">
          <div>{{formatTimeToMinute(row.publishTime)}}</div>
        </template>
      </vxe-column>

      <vxe-column field="taskStatus" title="Details" width="12%">
        <template #default="{  }">
          <div style="display: flex;align-items: center;justify-content: center">
            <div class="button">Total Info</div>
          </div>
        </template>
      </vxe-column>
    </vxe-table>

  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {getUserShopInfo} from "@/api";
import {time_filter} from "@/mixins/mixin";

export default {
  name: "UserShop",
  mixins: [time_filter],
  data () {
    return {
      allAlign: 'center',
      releasePageUrl:window.location.origin+'/product/release',
      goodsStoreDtos: [],
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.getShopInfo()
  },
  methods:{
    getShopInfo(){
      let requestBody={"pageNum": 1,"pageSize": 40}
      getUserShopInfo(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res) {
          this.goodsStoreDtos = res.data.goodsStoreDtos
        }
      })
    },
    publishProduct(){
      this.$router.push({path: "/product/release"}).catch(()=>{});
    },
    goToProductDetail(item){
      // todo item缺少taskId
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
.shop-panel {
  display: flex;
  flex-direction: column;
  position: relative;

  .publish-button{
    height: 100%;
    border-radius: 0.3rem;
    padding: 0 0.3rem;
    position: absolute;
    right: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 0.14rem;
    color: #FFFFFF;
    cursor: pointer;
    background: linear-gradient(140deg, #FE7713 0%, #FA3B00 100%);
  }

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
