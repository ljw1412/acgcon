<template>
  <acg-base-layout class="acg-admin-information">
    <information-query slot="action"
      @query="search"></information-query>

    <mz-table-simple lined
      header
      class="query-table bg-card"
      :data="tableData">
      <template #td="{item}">
        <div v-if="item.key"
          class="text-gray-900">
          {{item.data[item.key]}}
        </div>
      </template>
    </mz-table-simple>

    <mz-pagination slot="bottom"
      v-model="pageIndex"
      :layout="['total', '|', 'prev', 'pager', 'next']"
      :pageSize.sync="pageSize"
      :total="count"
      @change="fetchInformationList"></mz-pagination>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InformationQuery from './Query.vue'
import { fetchInformationList } from '../../../services/information'

@Component({ components: { InformationQuery } })
export default class AcgAdminInformation extends Vue {
  pageIndex = 1
  pageSize = 20
  count = 0
  informationList = []

  get tableData() {
    const list: any[][] = [['类型', '标题', '来源', '时间', '状态', '操作']]
    this.informationList.forEach(item => {
      list.push([
        { key: 'acgTypeCN', data: item },
        { key: 'title', data: item },
        { key: 'originCN', data: item },
        { key: 'time', data: item },
        { key: 'state', data: item },
        { data: item }
      ])
    })
    return list
  }

  async fetchInformationList(data: Record<string, any>) {
    const { list, count } = await fetchInformationList({
      ...data,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    })

    list.forEach((item: Record<string, any>) => {
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm')
    })

    this.count = count
    this.informationList = list
  }

  async search(data: Record<string, any>) {
    this.pageIndex = 1
    this.fetchInformationList(data)
  }
}
</script>

<style lang="scss">
</style>
