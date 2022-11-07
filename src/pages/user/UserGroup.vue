<template>
  <div class="group-panel">

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
        :data="userGrouponDtoList">

      <template #empty>
        <el-empty description="No group informations yet"></el-empty>
      </template>

      <vxe-column field="goodsTitle" title="Product Name" width="34%">
        <template #default="{ row }">
          <div style="display: flex;align-items: center;white-space:normal;">
            <img :src="row.goodsImage" alt="" style="width: 0.34rem;height: 0.34rem;object-fit: cover;">
            <p class="toe2" style="margin-left: 0.12rem;text-align: left;">{{row.goodsTitle}}</p>
          </div>
        </template>
      </vxe-column>

      <vxe-column field="grouponPrice" title="Group Info" width="14%">
        <template #default="{ row }">
          <div style="display: flex;flex-direction:column;text-align: left;">
            <div>Identity: <span style="color: #CF3135;font-weight: 500;">{{row.grouponOwner?'Organizer':'Member'}}</span></div>
            <div>Invitees:{{row.inviteesNumber||0}}</div>
            <div>Group Price:${{row.grouponPrice}}</div>
            <div>Members:<span style="color: #30921F; font-weight: 500;">{{row.currentPeople}}/{{row.peopleLimit}}</span></div>
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
<!--            <img-->
<!--                style="width: 0.16rem;height: 0.16rem;margin-left: 0.08rem;cursor: pointer;"-->
<!--                src="../../assets/images/home/copy.png"-->
<!--                @click="copy(row.grouponLink)"-->
<!--                alt=""/>-->
<!--            <img-->
<!--                style="width: 0.16rem;height: 0.16rem;margin-left: 0.08rem;cursor: pointer;"-->
<!--                src="../../assets/images/home/share.png"-->
<!--                alt=""/>-->
          </div>
        </template>

      </vxe-column>

      <vxe-column field="endTime" title="End Time" width="16%">
        <template #default="{ row }">
          <div>{{formatTimeToMinute(row.endTime)}}</div>
        </template>
      </vxe-column>

      <vxe-column field="taskStatus" title="Total Info" width="12%">
        <template #default="{ row }">
          <div style="display: flex;align-items: center;justify-content: center">
            <div class="button" @click="goToDetail(row.grouponLink)">Total Info</div>
          </div>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import {scrollToY} from "@/utils";
import {getUserGroupInfo} from "@/api";
import {time_filter} from "@/mixins/mixin";

export default {
  name: "UserGroup",
  mixins: [time_filter],
  data() {
    return {
      allAlign: 'center',
      userGrouponDtoList: [],
    }
  },
  mounted() {
    scrollToY(0, 0);
    this.getUserGroupInfo()
  },
  methods:{
    getUserGroupInfo(){
      let requestBody={"pageNum": 1,"pageSize": 40}
      getUserGroupInfo(requestBody).then(res => {
        console.log(JSON.stringify(res, null, 4))
        if (res) {
          this.userGrouponDtoList = res.data.userGrouponDtoList
        }
      })
    },
    copy(url){
      this.$copyText(url)
          .then(function () {
            alert('复制成功')
          }, function () {
            alert('复制失败')
          })
    },
    goToDetail(grouponLink){
      window.open(grouponLink, '_self')
    }
  }
}
</script>

<style lang="scss" scoped>
.group-panel {
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
