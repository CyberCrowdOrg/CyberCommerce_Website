<template>
  <div class="home">
    <main class="main-content" ref="main">
      <section class="main-section">
        <FirstSection></FirstSection>
      </section>
      <section class="main-section">
        <Product></Product>
        <DaoSection></DaoSection>
      </section>
    </main>
  </div>
</template>

<script>


import FirstSection from "./FirstSection.vue";
import Product from "./Product.vue";
import DaoSection from "@/pages/home/DaoSection";

export default {
  name: "HomePage",
  data() {
    return {
      activeName: 'tab',
      isHeaderDark: true,
    };
  },
  components: {
    FirstSection,
    Product,
    DaoSection,
  },
  watch: {},
  created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>

<style lang="scss">

.home {

  .main-content {
    overflow: hidden;

    .main-section {
      display: flex;
      flex-direction: column;
    }
  }
}

</style>
