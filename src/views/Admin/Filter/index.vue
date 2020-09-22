<template>
  <acg-base-layout class="acg-admin-filter">
    <filter-query slot="action"
      @query="handleQuery"
      @action="handleAction"></filter-query>
    <tag-group v-model="tagGroupList"
      @delete="handleDelete"></tag-group>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterQuery from './Query.vue'
import TagGroup from './TagGroup.vue'
import {
  fetchTagGroupList,
  updateTagGroupOrder,
  createTagGroup,
  deleteTagGroup,
  resetTagGroupCache
} from '@/services/tag'
import { groupNamePrompt } from './_helper'
import { namespace } from 'vuex-class'

@Component({ components: { FilterQuery, TagGroup } })
export default class AcgAdminFilter extends Vue {
  @(namespace('admin').Mutation)
  readonly setGroupOrderState!: Function

  acgType = ''
  subType = ''
  tagGroupList: Record<string, any>[] = []
  tagGroupListBak: Record<string, any>[] = []

  async handleQuery(acgType: string, subType: string) {
    this.acgType = acgType
    this.subType = subType
    this.tagGroupList = await fetchTagGroupList(acgType, subType)
  }

  async createTagGroup() {
    try {
      const name = await groupNamePrompt()
      const tagGroupItem = await createTagGroup({
        name,
        acgType: this.acgType,
        subType: this.subType
      })
      this.tagGroupList.push(tagGroupItem)
    } catch (error) {}
  }

  async resetCache() {
    let success = false
    try {
      await resetTagGroupCache({ acgType: this.acgType, subType: this.subType })
      this.handleQuery(this.acgType, this.subType)
      success = true
    } catch (error) {}
    this.$snackbar.show({
      content: success ? '重置缓存成功' : '重置缓存失败',
      color: success ? 'success' : 'danger',
      placement: 'top'
    })
  }

  async handleAction(action: string) {
    if (action === 'create-group') {
      // 创建标签组
      this.createTagGroup()
    } else if (action === 'sort') {
      // 排序
      this.tagGroupListBak = [...this.tagGroupList]
      this.setGroupOrderState(true)
    } else if (action === 'sort-save') {
      // 保存标签组排序
      this.tagGroupList = await updateTagGroupOrder({
        acgType: this.acgType,
        subType: this.subType,
        list: this.tagGroupList.map(item => item._id)
      })
      this.setGroupOrderState(false)
    } else if (action === 'sort-cancel') {
      // 取消标签组排序
      this.tagGroupList = this.tagGroupListBak
      this.setGroupOrderState(false)
    } else if (action === 'reset-cache') {
      // 重置缓存
      this.resetCache()
    }
  }

  async handleDelete(item: Record<string, any>) {
    console.log(item)
    try {
      await this.$modal.confirm({
        width: '400px',
        title: '警告',
        content: `确认删除标签组“${item.name}”吗？(此操作会删除所有该标签组下面的标签)`,
        confirm: { color: 'danger' }
      })
      await deleteTagGroup({
        groupId: item._id,
        acgType: this.acgType,
        subType: this.subType
      })
      this.tagGroupList.remove(item)
    } catch (error) {}
  }
}
</script>

<style lang="scss">
</style>
