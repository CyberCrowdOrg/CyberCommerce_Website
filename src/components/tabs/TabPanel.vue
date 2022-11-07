<template>
  <div :class="panelCls()" ref="panel">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      currentName: this.name,
      height: 0,
    };
  },
  name: "TabPanel",
  props: {
    label: {
      type: [String, Function],
      default: ""
    },
    name: [String, Number]
  },
  watch: {
    label() {
      this.updateNav();
    },
    name(val) {
      this.currentName = val;
      this.updateNav();
    }
  },
  inject: ["TabsInstance"],
  computed: {},
  methods: {
    updateNav() {
      this.TabsInstance.updateNav();
    },
    panelCls() {
      return ["tab-panel-content", {['panel-active']: this.show === true}];
    },
    getHeight() {
      setTimeout(() => {
        this.height = this.$refs.panel.offsetHeight
      });
    }
  },
  mounted() {
    this.updateNav();
    this.getHeight();
  }
};
</script>
<style scoped>
</style>
