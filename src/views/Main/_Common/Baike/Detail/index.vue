<template>
  <div class="acg-baike-detail">
    <acg-navigation></acg-navigation>
    <div class="acg-baike-info"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import AcgNavigation from '@/components/AcgNavigation/index.vue'

@Component({ components: { AcgNavigation } })
export default class AcgBaikeDetail extends AcgVue {}
</script>

<style lang="scss">
.acg-baike-detail {
  position: relative;
  > .acg-navigation {
    position: absolute;
    height: 50px;
  }

  .acg-baike-info {
    height: 440px;
    background-color: $black-background-color;
  }
}
</style>
