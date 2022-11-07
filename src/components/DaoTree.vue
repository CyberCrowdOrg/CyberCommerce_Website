<template>
  <div class="dao-tree-layout">
    <vue-okr-tree
        :data="data"
        node-key="id"
        label-class-name="custom-label-class"
        @node-click="handleNodeClick"
        :render-content="renderDetailNodeContent">
    </vue-okr-tree>
  </div>
</template>

<script>
import { VueOkrTree } from 'vue-okr-tree';
import 'vue-okr-tree/dist/vue-okr-tree.css';

export default {
  name: "DaoTree",
  props: ["data"],
  components: {
    VueOkrTree
  },
  methods: {
    renderDetailNodeContent(h, node) {
      const customNodeClass = ['custom-node-class']
      if (node.data.styleClass) {
        customNodeClass.push(node.data.styleClass)
      }
      let nodeStyle
      if (node.data.color) {
        nodeStyle = {'background-color': node.data.color}
      }
      return (
          <div class={customNodeClass} style={nodeStyle}>
            <div class="custom-node-content">{node.data.text}</div>
          </div>
      )
    },
    handleNodeClick(data) {
      this.$emit("onNodeClick",data);
    },
  }
}
</script>

<style lang="scss" scoped>

.dao-tree-layout{
  font-size: 10px;
}

::v-deep(.custom-node-class) {
  height: 110px !important;
  font-size: 10px !important;
  background-color: #0F7BFF;
  color: #F8F8F8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  .custom-node-content {
    writing-mode: vertical-lr;
    white-space: pre-line;
    margin: 10px 5px;
  }
}

::v-deep(.highlight-node) {
  box-shadow: 0 0 10px #FA3B00;
  -moz-transform: rotate(-89deg) translateX(-190px);
}

::v-deep(.org-chart-node-label) {
  padding: 0 0 !important;
  background-color: transparent !important;
}

::v-deep(.custom-label-class) {
  padding: 0 0 !important;
  background-color: transparent !important;
}

::v-deep(.org-chart-node::before) {
  border-top: 1px solid #0F7BFF;
}

::v-deep(.org-chart-node::after) {
  height: 19px !important;
  border-top: 1px solid #0F7BFF;
  border-left: 1px solid #0F7BFF;
}

::v-deep(.org-chart-node:first-child::after) {
  border-left: 1px solid #0F7BFF;
  border-radius: 0 0 0 0;
}

::v-deep(.org-chart-node:last-child::before) {
  border-right: 1px solid #0F7BFF;
  border-radius: 0 0 0 0;
}

::v-deep(.org-chart-node.is-leaf.is-not-child::before) {
  height: 0 !important;
}

::v-deep(.org-chart-node-children) {
  display: flex;
  justify-content: center;
}

::v-deep(.org-chart-node-children::before) {
  border-left: 1px solid #0F7BFF;
}

::v-deep(.org-chart-node){

}
</style>
