<template>
  <div class="acg-baike">
    <baike-filter @change="handleFilterChange"></baike-filter>
    <baike-content></baike-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaikeFilter from './Filter.vue'
import BaikeContent from './Content.vue'
import AcgVue from '@/mixins/AcgVue'

@Component({ components: { BaikeFilter, BaikeContent } })
export default class AcgBaike extends AcgVue {
  handleFilterChange(filter: Record<string, any>) {
    console.log(filter)
  }
}
</script>

<style lang="scss">
@import '../var.scss';
.acg-baike {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

@media screen and (max-width: $screen-width-sm) {
  .acg-baike {
    flex-direction: column;
  }

  .acg-baike-filter,
  .acg-baike-content {
    width: 100%;
  }
}
</style>