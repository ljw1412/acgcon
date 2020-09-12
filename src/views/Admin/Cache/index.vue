<template>
  <acg-base-layout class="acg-admin-cache">
    <cache-query slot="action"
      @query="handleQuery"></cache-query>

    <mz-table-simple lined
      header
      align="center"
      class="query-table bg-card"
      :data="tableData">
      <template #td="{item}">
        {{item.value}}
        <template v-if="item.type==='action'">
          <mz-button flat
            color="success"
            @click="handleShowCache(item.key)">查看</mz-button>
          <mz-button flat
            color="danger"
            @click="handleDeleteCache(item.key)">删除</mz-button>
        </template>
      </template>
    </mz-table-simple>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CacheQuery from './Query.vue'
import { fetchCache, delCache, fetchCacheList } from '@/services/admin'

@Component({ components: { CacheQuery } })
export default class AcgAdminCache extends Vue {
  result: string[] = []

  get tableData() {
    const data: any[] = [['key', '操作']]
    data.push(
      ...this.result.map(key => [
        { value: key, type: 'key' },
        { key, type: 'action' }
      ])
    )
    return data
  }

  async handleQuery(type: string, keyword: string) {
    this.result = await fetchCacheList({ type, keyword, count: 150 })
  }

  async handleShowCache(key: string) {
    let data = await fetchCache(key)
    if (typeof data === 'object') {
      data = this.$createElement(
        'pre',
        { style: 'white-space: pre-wrap;' },
        JSON.stringify(data, null, 2)
      )
    }
    await this.$modal.alert(data, key)
  }

  async handleDeleteCache(key: string) {
    try {
      await this.$modal.confirm({
        title: '删除确认',
        content: `确认删除缓存[${key}]?`,
        confirm: { color: 'danger' }
      })
      await delCache(key)
      this.result.remove(key)
    } catch (error) {}
  }
}
</script>

<style lang="scss">
.acg-admin-cache {
  .query-table {
    color: $color-text-primary;
    th:nth-child(1) {
      width: 50%;
    }
    th:nth-child(2) {
      width: 50%;
    }
  }
}
</style>
