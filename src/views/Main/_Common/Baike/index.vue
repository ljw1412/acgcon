<template>
  <div class="acg-baike">
    <sticky-filter :acg-type="acgType"
      :baike-type="baikeType"
      @change="handleFilterChange"></sticky-filter>
    <div class="acg-baike__content">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StickyFilter from './components/StickyFilter.vue'
import AcgVue from '@/mixins/AcgVue'

@Component({ components: { StickyFilter } })
export default class AcgBaike extends AcgVue {
  get baikeType() {
    return this.$route.params.baikeType || this.acgType
  }

  handleFilterChange(filter: Record<string, any>) {
    console.log(filter)
  }
}
</script>

<style lang="scss">
.acg-baike {
  display: flex;
  justify-content: space-between;
  &__content {
    width: calc(100% - 320px);
    margin-left: auto;
  }
}
</style>