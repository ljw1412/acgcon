<template>
  <div class="admin-filter-query">
    <mz-select v-model="acgType"
      style="width:100px;"
      placeholder="ACG类型">
      <mz-option v-for="item of acgTypeList"
        :key="item.value"
        :value="item.value"
        :label="item.label"></mz-option>
    </mz-select>
    <mz-select v-model="subType"
      style="width:100px;"
      placeholder="二级类型">
      <mz-option v-for="item of subTypeList"
        :key="item.value"
        :value="item.value"
        :label="item.label"></mz-option>
    </mz-select>

    <mz-button color="primary"
      key="btn-new">新增标签组</mz-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getAcgTypeList } from '@/helpers/acg'
import { getSubTypesByAcgType } from '@/helpers/navigation'

@Component
export default class AdminFilterQuery extends Vue {
  acgType = ''
  acgTypeList = getAcgTypeList()
  subType = ''
  subTypeList: Record<string, any>[] = []

  @Watch('acgType')
  onAcgTypeChange(val: Acgcon.Types) {
    this.subTypeList = getSubTypesByAcgType(val)
    this.subType = this.subTypeList.length ? this.subTypeList[0].value : ''
  }

  @Watch('subType')
  onSubTypeChange() {
    this.$emit('query', this.acgType, this.subType)
  }

  created() {
    if (this.acgTypeList.length) {
      this.acgType = this.acgTypeList[0].value
    }
  }
}
</script>

<style lang="scss">
</style>
