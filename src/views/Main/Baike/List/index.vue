<template>
  <div class="baike-list">
    <div class="baike-list-content d-flex justify-content-between px-15">
      <baike-filter></baike-filter>
      <baike-content></baike-content>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaikeFilter from './Filter.vue'
import BaikeContent from './Content.vue'

@Component({ components: { BaikeFilter, BaikeContent } })
export default class AcgBaikeList extends Vue {}
</script>

<style lang="scss">
@media screen and (max-width: $screen-width-sm) {
  .baike-list-content {
    flex-direction: column;
    .baike-filter,
    .baike-content {
      width: 100%;
    }
  }
}
</style>
