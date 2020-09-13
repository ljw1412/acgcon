<template>
  <div class="admin-information-query">
    <mz-select v-model="acgType"
      style="width:100px;"
      placeholder="ACG类型"
      @change="query">
      <mz-option v-for="item of acgTypeList"
        :key="item.value"
        :value="item.value"
        :label="item.label"></mz-option>
    </mz-select>

    <mz-select v-model="origin"
      style="width:100px;"
      placeholder="来源"
      @change="query">
      <mz-option v-for="item of originList"
        :key="item.value"
        :value="item.value"
        :label="item.label"></mz-option>
    </mz-select>

    <mz-select v-model="state"
      style="width:100px;"
      placeholder="状态"
      @change="query">
      <mz-option v-for="item of stateList"
        :key="item.value"
        :value="item.value"
        :label="item.label"></mz-option>
    </mz-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { fetchInformationOrigins } from '@/services/information'

@Component
export default class AdminInformationQuery extends Vue {
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

  async fetchOriginList() {
    const list = await fetchInformationOrigins(this.acgType)
    list.unshift({ value: '', label: '全部' })
    this.originList = list
  }

  query() {
    this.$emit('query', {
      acgType: this.acgType || undefined,
      origin: this.origin || undefined,
      state: this.state === '' ? undefined : this.state
    })
  }

  @Watch('acgType')
  handleAcgTypeChange() {
    this.fetchOriginList()
    this.origin = ''
  }

  created() {
    this.fetchOriginList()
    this.query()
  }
}
</script>

<style lang="scss">
</style>
