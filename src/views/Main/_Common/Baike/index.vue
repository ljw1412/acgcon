<template>
  <div class="acg-baike">
    <baike-filter :acg-type="acgType"
      :baike-type="baikeType"
      @change="handleFilterChange"></baike-filter>
    <div class="acg-baike__content">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaikeFilter from './components/Filter.vue'
import AcgVue from '@/mixins/AcgVue'

@Component({ components: { BaikeFilter } })
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