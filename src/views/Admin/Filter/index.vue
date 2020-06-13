<template>
  <acg-base-layout class="acg-admin-filter">
    <template #action>
      <mz-select v-model="acgType"
        style="width:140px;"
        placeholder="ACG类型">
        <mz-option v-for="item of acgTypeList"
          :key="item.value"
          :value="item.value"
          :laebl="item.label"></mz-option>
      </mz-select>
      <mz-select v-model="baikeType"
        style="width:140px;"
        placeholder="百科类型">
        <mz-option v-for="item of baikeTypeList"
          :key="item.value"
          :value="item.value"
          :laebl="item.label"></mz-option>
      </mz-select>
      <mz-button color="primary">新增标签组</mz-button>
    </template>
    <div class="acg-admin-filter__content">
      <mz-row :gutter="10"
        flex
        style="flex-wrap:wrap;">
        <mz-col v-for="item of list"
          :key="item._id"
          :md="12"
          :lg="8"
          style="margin-bottom:10px;">
          <tag-group :data="item"></tag-group>
        </mz-col>
      </mz-row>
    </div>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getBaikeTypesByAcgType } from '@/configs/index'
import TagGroup from './TagGroup.vue'

@Component({ components: { TagGroup } })
export default class AcgAdminFilter extends Vue {
  acgType = ''
  acgTypeList = [
    { value: 'animation', label: '动画' },
    { value: 'comic', label: '漫画' },
    { value: 'game', label: '游戏' }
  ]
  baikeType = ''
  baikeTypeList: Record<string, any>[] = []
  list: Record<string, any>[] = []

  async fetchFilterList() {
    this.list = await this.$get('baike/filter', {
      params: { acgType: this.acgType, type: this.baikeType }
    })
  }

  mounted() {
    this.acgType = 'animation'
  }

  @Watch('acgType')
  onAcgTypeChange(val: Acgcon.Types) {
    this.baikeTypeList = getBaikeTypesByAcgType(val)
    this.baikeType = this.baikeTypeList[0].value
  }

  @Watch('baikeType')
  onBaikeType() {
    this.fetchFilterList()
  }
}
</script>

<style lang="scss">
.acg-admin-filter {
  .mz-select {
    display: inline-block;
  }

  .mz-tag {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
