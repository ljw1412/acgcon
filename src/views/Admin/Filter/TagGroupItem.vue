<template>
  <div class="admin-filter-tag-group-item bg-card rounded-sm h-100">
    <div class="header d-flex align-items-center justify-content-between px-16"
      :class="{'border-bottom': !isGroupOrder}">
      <!-- 标题 -->
      <div class="title d-flex align-items-center py-16 lh-22">
        <div v-if="data.multiple"
          class="mr-4 text-success">[多选]</div>
        <div class="font-weight-bold"
          :class="{'cursor-pointer':finalState === 'edit'}"
          @click="handleTitleClick">{{data.name}}</div>
      </div>
      <!-- 操作 -->
      <div>
        <tag-group-action :state="finalState"
          @action="handleAction"></tag-group-action>
      </div>
    </div>
    <div v-show="!isGroupOrder"
      class="content p-16">
      <tag-group-grid :state="finalState"
        :data="data"></tag-group-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TagGroupAction from './TagGroupAction'
import TagGroupGrid from './TagGroupGrid.vue'
import { updateTagOrder, renameTagGroup } from '@/services/tag'
import { groupNamePrompt } from './_helper'
import { namespace } from 'vuex-class'

@Component({ components: { TagGroupGrid, TagGroupAction } })
export default class AdminFilterTagGroupItem extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Record<string, any>
  @(namespace('admin').State)
  readonly isGroupOrder!: boolean

  state = 'normal'
  tagsBak = []

  get finalState() {
    return this.isGroupOrder ? 'group-sort' : this.state
  }

  get baseParams() {
    const { _id: groupId, acgType, subType } = this.data
    return { groupId, acgType, subType }
  }

  async handleAction(action: string) {
    const { data } = this
    if (action === 'edit') {
      this.state = 'edit'
    } else if (action === 'sort') {
      this.tagsBak = this.data.tags
      this.state = 'tag-sort'
    } else if (action === 'edit-end') {
      this.state = 'normal'
    } else if (action === 'tag-sort-cancel') {
      data.tags = this.tagsBak
      this.state = 'normal'
    } else if (action === 'tag-sort-save') {
      // 保存标签排序
      const list = data.tags.map((item: any) => item._id)
      await updateTagOrder({ ...this.baseParams, list })
      this.state = 'normal'
    }
    console.log(action)
  }

  async handleTitleClick() {
    if (this.finalState === 'edit') {
      try {
        const newName = await groupNamePrompt(this.data.name)
        const { nModified } = await renameTagGroup({
          name: newName,
          ...this.baseParams
        })
        if (nModified === 0) {
          return this.$snackbar.show({
            content: '重命名失败',
            color: 'danger'
          })
        }
        this.data.name = newName
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss">
.admin-filter-tag-group-item {
  > .content {
    min-height: 80px;
    box-sizing: border-box;
  }
}
</style>
