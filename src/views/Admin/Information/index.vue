<template>
  <acg-base-layout class="admin-information">
    <template #action>
      <mz-select v-model="acgType"
        style="width:100px;"
        placeholder="ACG类型"
        @change="search">
        <mz-option v-for="item of acgTypeList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>

      <mz-select v-model="origin"
        style="width:100px;"
        placeholder="来源"
        @change="search">
        <mz-option v-for="item of originList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>

      <mz-select v-model="state"
        style="width:100px;"
        placeholder="状态"
        @change="search">
        <mz-option v-for="item of stateList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>
    </template>

    <mz-table-simple lined
      header
      class="query-table"
      :data="tableData">
      <template #td="{item}">
        <div v-if="item.key">
          {{item.data[item.key]}}
        </div>
      </template>
    </mz-table-simple>

    <template #bottom>
      <mz-pagination v-model="pageIndex"
        :layout="['total', '|', 'prev', 'pager', 'next']"
        :pageSize.sync="pageSize"
        :total="count"
        @change="reFindList"></mz-pagination>
    </template>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AdminInformation extends Vue {
  origin = ''
  originList = []
  acgType = ''
  acgTypeList = [
    { value: '', label: '全部类型' },
    { value: 'animation', label: '动画' },
    { value: 'comic', label: '漫画' },
    { value: 'game', label: '游戏' }
  ]
  state = ''
  stateList = [
    { value: '', label: '全部状态' },
    { value: -1, label: '隐藏' },
    { value: 0, label: '待审核' },
    { value: 1, label: '上线' }
  ]
  pageIndex = 1
  pageSize = 40
  count = 0
  informationList: Record<string, any>[] = []

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

  async reFindFromList() {
    const list = await this.$get('information/origins', {
      params: { acgType: this.acgType }
    })
    list.unshift({ value: '', label: '全部' })
    this.originList = list
  }

  async reFindList() {
    const { list, count } = await this.$get('information', {
      params: {
        acgType: this.acgType || undefined,
        origin: this.origin || undefined,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        state: this.state === '' ? undefined : this.state
      }
    })
    this.count = count
    this.informationList = list
  }

  search() {
    this.pageIndex = 1
    this.$nextTick(this.reFindList)
  }

  @Watch('acgType')
  handleAcgTypeChange() {
    this.reFindFromList()
    this.origin = ''
  }

  async created() {
    await this.reFindFromList()
    this.reFindList()
  }
}
</script>

<style lang="scss">
.admin-information .query-table {
  color: var(--color-text-primary);
  background-color: var(--color-card-background);
}
</style>
