<template>
  <acg-base-layout class="acg-admin-filter">
    <template #action>
      <template v-if="!sort">
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
          key="btn-new"
          @click="displayGroupAddModal">新增标签组</mz-button>
        <mz-button color="primary"
          outlined
          key="btn-sort"
          @click="handleSort">标签组排序</mz-button>
        <mz-button color="warning"
          outlined
          @click="resetCache">重置缓存</mz-button>
      </template>
      <template v-else>
        <mz-button color="danger"
          key="btn-sort-cancel"
          @click="handleUnsort">放弃排序</mz-button>
        <mz-button color="success"
          key="btn-sort-save"
          @click="handleSaveSort">保存排序</mz-button>
      </template>
    </template>

    <draggable v-model="list"
      group="tag-group"
      class="tag-group-draggable"
      handle=".tag-group-reorder"
      ghost-class="is-ghost">
      <transition-group tag="mz-row"
        name="flip-list">
        <mz-col v-for="item of list"
          style="margin-bottom:10px;"
          class="tag-group"
          :key="item._id"
          :md="12"
          :lg="8">
          <tag-group :data="item"
            :sort="sort"
            :acg-type="acgType"
            :sub-type="subType"
            @rename="handleRename"
            @delete="handleTagGroupDelete"
            @multiple-change="handleMultipleChange"></tag-group>
        </mz-col>
      </transition-group>
    </draggable>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getSubTypesByAcgType } from '@/configs/index'
import { TagGroupManager } from './action'
import TagGroup from './TagGroup.vue'

@Component({ components: { TagGroup } })
export default class AcgAdminFilter extends Vue {
  tagGroupManager!: TagGroupManager
  acgType = ''
  acgTypeList = [
    { value: 'animation', label: '动画' },
    { value: 'comic', label: '漫画' },
    { value: 'game', label: '游戏' }
  ]
  subType = ''
  subTypeList: Record<string, any>[] = []
  list: Record<string, any>[] = []
  listBak: Record<string, any>[] = []
  sort = false

  get baseParams() {
    return { acgType: this.acgType, type: this.subType }
  }

  async fetchFilterList() {
    this.list = await this.tagGroupManager.list()
  }

  async resetCache() {
    await this.tagGroupManager.resetCache()
    this.fetchFilterList()
  }

  async displayGroupAddModal() {
    const tagGroup = await this.tagGroupManager.create()
    tagGroup && this.list.push(tagGroup)
  }

  handleSort() {
    this.sort = true
    this.listBak = this.list.slice(0)
  }

  handleUnsort() {
    this.sort = false
    this.list = this.listBak
  }

  async handleMultipleChange(state: boolean, data: any) {
    const success = await this.tagGroupManager.updateMultiple(data._id, state)
    !success && (data.multiple = !state)
  }

  async handleSaveSort() {
    await this.tagGroupManager.updateOrder(this.list.map(item => item._id))
    await this.fetchFilterList()
    this.sort = false
  }

  async handleRename(item: any) {
    const name = await this.tagGroupManager.rename(item._id, item.name)
    name && (item.name = name)
  }

  async handleTagGroupDelete(item: any) {
    const success = await this.tagGroupManager.delete(item)
    success && this.list.remove(item)
  }

  @Watch('acgType')
  onAcgTypeChange(val: Acgcon.Types) {
    this.subTypeList = getSubTypesByAcgType(val)
    this.subType = this.subTypeList[0].value
  }

  @Watch('subType')
  onSubTypeChange() {
    this.fetchFilterList()
  }

  created() {
    this.tagGroupManager = new TagGroupManager(this)
  }

  mounted() {
    this.acgType = 'animation'
  }
}
</script>

<style lang="scss">
.acg-admin-filter {
  .tag-group.is-ghost .acg-admin-tag-group {
    box-shadow: 0 0 10px $color-primary;
    opacity: 0.5;
  }
}

.tag-group-draggable {
  > .mz-row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
    > .mz-col {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
}
</style>
