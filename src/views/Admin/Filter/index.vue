<template>
  <div class="acg-admin-filter">
    <mz-select v-model="acgType"
      dropdownMatchSelectWidth
      style="width:200px;"
      label="ACG类型"
      :list="acgTypeList"></mz-select>
    <mz-select v-model="baikeType"
      dropdownMatchSelectWidth
      style="width:200px;"
      label="百科类型"
      :list="baikeTypeList"></mz-select>

    <div class="acg-admin-filter__content">
      <div v-for="item of list"
        :key="item._id"
        class="">
        <div>{{item.name}}</div>
        <div>
          <span v-for="tag of item.tags"
            :key="tag._id">{{tag.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getBaikeTypesByAcgType } from '../../../configs/base'

@Component
export default class AcgAdminFilter extends Vue {
  acgType = 'animation'
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

  @Watch('acgType', { immediate: true })
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
}
</style>
