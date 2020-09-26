<template>
  <div class="baike-list">
    <div class="baike-list-content d-flex justify-content-between px-15">
      <baike-filter @change="handleFilterChange"></baike-filter>
      <div class="baike-data mb-20">
        <baike-content :list="list"></baike-content>
        <mz-pagination v-model="pageIndex"
          :layout="['total', '|', 'prev', 'pager', 'next']"
          :pageSize.sync="pageSize"
          :total="count"></mz-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import BaikeFilter from './Filter.vue'
import BaikeContent from './Content.vue'
import { fetchBaikeList } from '@/services/baike'

@Component({ components: { BaikeFilter, BaikeContent } })
export default class AcgBaikeList extends AcgVue {
  list = []
  pageIndex = 1
  pageSize = 24
  count = 0
  filterList: string[] = []

  async fetchBaikeList() {
    const { list, count } = await fetchBaikeList({
      acgType: this.acgType,
      subType: this.subType,
      tags: this.filterList,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    })
    this.list = list
    this.count = count
  }

  handleFilterChange(filter: Record<string, any>) {
    this.filterList = Object.values(filter).filter(id => id !== 'all')
    this.fetchBaikeList()
  }
}
</script>

<style lang="scss">
.baike-list {
  .baike-data {
    width: calc(100% - 320px);
    transition: width 0.15s linear;
    will-change: width;
  }
}

@media screen and (max-width: $screen-width-sm) {
  .baike-list-content {
    flex-direction: column;
    .baike-filter,
    .baike-data {
      width: 100%;
    }
  }
}
</style>
