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

    <template #footer>
      <div class="fs-14">{{tips}}</div>
      <mz-input v-if="isEdit"
        ref="input"
        v-model="text"
        class="mt-10"
        placeholder="输入新增的标签名称（回车添加）"
        @keydown.native.enter="handleAddTag">
        <mz-icon slot="suffix"
          name="return-down-back-outline"
          @click="handleAddTag"></mz-icon>
      </mz-input>
    </template>

  </draggable>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MzInput } from 'manzhai-ui/types/packages/Input'
import { deleteTag, addTag } from '@/services/tag'

@Component
export default class AdminFilterTagGroupGrid extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Record<string, any>
  @Prop(String)
  readonly state!: 'normal' | 'edit' | 'group-sort' | 'tag-sort'
  @Ref('input')
  readonly inputRef!: MzInput

  text = ''
  isAdding = false

  get tips() {
    if (this.state === 'edit') return '您可以点击"x"来删除对应的标签'
    if (this.state === 'tag-sort') return '您可以通过拖拽标签来修改它们的排序'
    return ''
  }

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

  async handleAddTag() {
    const name = this.text.trim()
    if (name) {
      this.isAdding = true
      try {
        const result = await addTag({ name, ...this.baseParams })
        this.data.tags = result
        this.text = ''
      } catch (error) {
      } finally {
        this.isAdding = false
        await this.$nextTick()
        this.inputRef.focus()
      }
    }
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
