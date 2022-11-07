<template>

  <div class="footer-section">
    <div class="footer">

    </div>
  </div>
</template>

<script>

import {media_util} from "@/mixins/mixin";

export default {
  name: "FooterView",
  mixins: [media_util],
  methods:{

  }
}
</script>

<style lang="scss" scoped>

.footer-section{
  background: #343444;
  width: 100%;

  .footer{
    width: 12rem;
    height: 2rem;
    margin: 0 auto;
  }
}
</style>
