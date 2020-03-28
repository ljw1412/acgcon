<template>
  <div class="acg-baike">
    <baike-filter :acg-type="acgType"
      :baike-type="baikeType"
      @change="handleFilterChange"></baike-filter>
    <mz-card class="acg-baike__content"
      :elevation="-1">
      <baike-list></baike-list>
    </mz-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaikeFilter from './components/Filter.vue'
import BaikeList from './components/List.vue'
import AcgVue from '@/mixins/AcgVue'

@Component({ components: { BaikeFilter, BaikeList } })
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
@import './var.scss';
.acg-baike {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

  &__content {
    width: calc(100% - #{$filter-width} - 20px);
    margin-left: auto;
    transition: width 0.15s linear;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
}

@media screen and (max-width: 864px) {
  .acg-baike {
    flex-direction: column;
    .acg-baike-filter,
    &__content {
      width: 100%;
    }
  }
}
</style>