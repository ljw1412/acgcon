<template>
  <acg-base-layout class="admin-information">
    <template #action>
      <mz-select v-model="acgType"
        style="width:100px;"
        placeholder="ACG类型">
        <mz-option v-for="item of acgTypeList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>

      <mz-select v-model="from"
        style="width:100px;"
        placeholder="来源">
        <mz-option v-for="item of fromList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>

      <mz-select v-model="state"
        style="width:100px;"
        placeholder="状态">
        <mz-option v-for="item of stateList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>
    </template>

    <template #bottom>
      <mz-pagination v-model="pageIndex"
        :layout="['total', '|', 'prev', 'pager', 'next']"
        :pageSize.sync="pageSize"
        :total="count"></mz-pagination>
    </template>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AdminInformation extends Vue {
  from = ''
  fromList = []
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
  pageSize = 20
  count = 0

  async reFindFromList() {
    const list = await this.$get('information/list_from', {
      params: { acgType: this.acgType }
    })
    list.unshift({ value: '', label: '全部' })
    this.fromList = list
  }

  async reFindList() {
    const { list, count } = await this.$get('information', {
      params: {
        acgType: this.acgType || undefined,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        state: this.state || undefined
      }
    })
  }

  @Watch('acgType')
  handleAcgTypeChange() {
    this.reFindFromList()
    this.from = ''
  }

  async created() {
    await this.reFindFromList()
    this.reFindList()
  }
}
</script>

<style lang="scss">
</style>
