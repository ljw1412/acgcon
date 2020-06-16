<template>
  <acg-base-layout class="acg-admin-filter">
    <template #action>
      <mz-select v-model="acgType"
        style="width:100px;"
        placeholder="ACG类型">
        <mz-option v-for="item of acgTypeList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>
      <mz-select v-model="baikeType"
        style="width:100px;"
        placeholder="百科类型">
        <mz-option v-for="item of baikeTypeList"
          :key="item.value"
          :value="item.value"
          :label="item.label"></mz-option>
      </mz-select>
      <mz-button color="primary"
        @click="displayGroupAddModal">新增标签组</mz-button>
      <mz-button color="primary"
        outlined
        @click="sort = !sort">{{sort?'保存排序':'分类排序'}}</mz-button>
    </template>

    <draggable tag="mz-row"
      v-model="list"
      style="flex-wrap:wrap;"
      handle=".tag-group-reorder"
      ghost-class="is-ghost"
      :component-data="{props:{gutter:10,flex:true}}">
      <mz-col v-for="item of list"
        style="margin-bottom:10px;"
        class="tag-group"
        :key="item._id"
        :md="12"
        :lg="8">
        <tag-group :data="item"
          :sort="sort"
          @delete="handleTagGroupDelete"></tag-group>
      </mz-col>
    </draggable>
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
  sort = false

  async fetchFilterList() {
    this.list = await this.$get('baike/filter', {
      params: { acgType: this.acgType, type: this.baikeType }
    })
  }

  async createFilter(name: string) {
    return await this.$post('baike/filter', {
      name,
      acgType: this.acgType,
      type: this.baikeType
    })
  }

  async displayGroupAddModal() {
    try {
      const text = await this.$modal.prompt({
        title: '新增标签组',
        content: '请输入标签组名称',
        rules: { test: /.{1,8}/, message: '请输入1-8个字符' },
        // TODO 无效果？
        confirm: { color: 'danger' }
      })
      await this.createFilter(text as string)
      await this.fetchFilterList()
    } catch (error) {}
  }

  handleTagGroupDelete(item: any) {
    this.list.remove(item)
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

  mounted() {
    this.acgType = 'animation'
  }
}
</script>

<style lang="scss">
.acg-admin-filter {
  .tag-group.is-ghost .acg-admin-tag-group {
    box-shadow: 0 0 5px $color-primary;
    opacity: 0.5;
  }
}
</style>
