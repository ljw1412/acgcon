<template>
  <draggable v-model="data.tags"
    tag="div"
    class="admin-filter-tag-group-grid"
    :class="{'is-sort':isTagSort}"
    :draggable="isTagSort?'.tag-item':''">
    <transition-group tag="div"
      name="flip-list">
      <mz-tag v-for="tag of data.tags"
        v-elevation="isTagSort ? 5 : 0"
        class="tag-item mr-10 mb-10"
        :closable="isEdit"
        :key="tag._id"
        @close="handleDeleteTag(tag)">{{tag.name}}</mz-tag>
    </transition-group>
  </draggable>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { deleteTag } from '../../../services/tag'

@Component
export default class AdminFilterTagGroupGrid extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Record<string, any>
  @Prop(String)
  readonly state!: 'normal' | 'edit' | 'group-sort' | 'tag-sort'

  get isEdit() {
    return this.state === 'edit'
  }

  get isTagSort() {
    return this.state === 'tag-sort'
  }

  get baseParams() {
    const { _id: groupId, acgType, subType } = this.data
    return { groupId, acgType, subType }
  }

  async handleDeleteTag(tag: Record<string, any>) {
    try {
      await this.$modal.confirm({
        width: '300px',
        title: '警告',
        content: `确认要删除标签“${tag.name}”吗？`,
        confirm: { color: 'danger' }
      })
      await deleteTag({ ...this.baseParams, id: tag._id })
      this.data.tags.remove(tag)
    } catch (_) {}
  }
}
</script>

<style lang="scss">
.admin-filter-tag-group-grid {
  &.is-sort {
    user-select: none;
    .tag-item {
      cursor: grab;
      &.sortable-chosen {
        cursor: grabbing;
      }
    }
  }
}
</style>
