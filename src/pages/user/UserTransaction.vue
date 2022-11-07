<template>
  <div class="transaction-panel">

    <vxe-table
        style="margin-left: 0.3rem;margin-right: 0.3rem;margin-top: 0.36rem;"
        class="table-style"
        header-cell-class-name="table-header"
        cell-class-name="table-cell"
        border
        show-header-overflow
        show-overflow
        :align="allAlign"
        :row-config="{isHover: true,height: 50}"
        :data="userTransactionList">

      <template #empty>
        <el-empty description="No transactions yet"></el-empty>
      </template>

      <vxe-column  title="Order No." width="20%">
        <template #default="{ row }">
          <div>{{row.orderNo}}</div>
        </template>
      </vxe-column>

      <vxe-column title="Amount" width="12%">
        <template #default="{ row }">
          <div>{{row.orderCoinAmount + " " +row.orderCoinName}}</div>
        </template>
      </vxe-column>

      <vxe-column title="Payee Address" width="20%">
        <template #default="{ row }">
          <div class="toe2" style="white-space:normal;">
            {{row.payeeAddress}}
          </div>
        </template>
      </vxe-column>

      <vxe-column title="Payer Address" width="20%">
        <template #default="{ row }">
          <div class="toe2" style="white-space:normal;">
            {{row.payerAddress}}
          </div>
        </template>
      </vxe-column>

      <vxe-column title="Payment Time" width="16%">
        <template #default="{ row }">
          <div>{{formatTimeToSecond(row.successTime)}}</div>
        </template>
      </vxe-column>

      <vxe-column title="Status" width="12%">
        <template #default="{ row }">
          <div>{{orderStatus(row.orderStatus)}}</div>
        </template>
      </vxe-column>
    </vxe-table>

  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {time_filter} from "@/mixins/mixin";
import {getUserShopInfo, getUserTransactions} from "@/api";

export default {
  name: "UserTransaction",
  mixins: [time_filter],
  data () {
    return {
      allAlign: 'center',
      userTransactionList: [],
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.getUserTransactions();
  },
  methods:{
    getUserTransactions(){
      let requestBody={"pageNum": 1,"pageSize": 40}
      getUserTransactions(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res){
          this.userTransactionList = res.data.baseOrderDtoList;
        }
      })
    },
    orderStatus(status){
      if (status === "0"){
        return "Unpaid"
      }else if (status === "5"){
        return "Paying"
      }else if (status === "6"){
        return "Paid"
      }else if (status === "7"){
        return "Failed"
      }else if (status === "8"){
        return "Refunded"
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.transaction-panel {
  display: flex;
  flex-direction: column;
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
