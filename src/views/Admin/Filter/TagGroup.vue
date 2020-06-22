<template>
  <mz-card class="acg-admin-tag-group"
    outlined>
    <div class="tag-group-title flex-center-space-between">
      <div>{{data.name}}</div>
      <div class="tag-group-action">
        <!-- 标签组排序 -->
        <mz-icon v-if="sort"
          name="reorder-three"
          class="tag-group-reorder"
          style="cursor: grab;"></mz-icon>
        <!-- 组内标签排序 -->
        <template v-else-if="isTagSort">
          <mz-icon v-tooltip.bottom="'取消'"
            name="close-circle-outline"
            class="mz-danger--text"
            @click="handleAction('sort-cancel')"></mz-icon>
          <mz-icon v-tooltip.bottom="'保存'"
            name="checkmark-circle-outline"
            class="mz-success--text"
            @click="handleAction('sort-save')"></mz-icon>
        </template>
        <!-- 此标签组编辑 -->
        <template v-else-if="isEdit">
          <mz-icon v-tooltip.bottom="'完成'"
            name="checkmark-circle-outline"
            class="mz-success--text"
            @click="isEdit=!isEdit"></mz-icon>
        </template>
        <!-- 一般模式 -->
        <mz-dropdown-menu v-else
          arrow
          width="120px"
          placement="bottom-end"
          :data="actionList"
          @action="handleAction">
          <mz-icon name="ellipsis-horizontal-circle"></mz-icon>
        </mz-dropdown-menu>
      </div>
    </div>

    <draggable v-show="!sort"
      v-model="data.tags"
      tag="div"
      class="tag-group-tags"
      :class="{'is-sort':isTagSort}"
      :draggable="isTagSort?'.tag-item':''">
      <transition-group tag="div"
        name="flip-list">
        <mz-tag v-for="tag of data.tags"
          class="tag-item"
          v-elevation="isTagSort ? 5 : 0"
          :closable="isEdit"
          :key="tag._id"
          @close="handleDeleteTag(tag)">{{tag.name}}</mz-tag>
      </transition-group>
      <mz-input v-show="isEdit"
        slot="footer"
        ref="input"
        v-model="text"
        size="medium"
        class="create-tag-input"
        placeholder="输入新增的标签名称，回车添加"
        :disabled="isAdding"
        @keydown.native.enter="handleAddTag">
        <mz-icon slot="suffix"
          name="return-down-back-outline"></mz-icon>
      </mz-input>
    </draggable>
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MzInput } from 'manzhai-ui/types/packages/Input'

@Component
export default class AcgAdminTagGroup extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Record<string, any>
  @Prop(Boolean)
  readonly sort!: boolean
  @Prop(String)
  readonly acgType!: string
  @Prop(String)
  readonly subType!: string

  @Ref('input')
  readonly inputRef!: MzInput

  isDisplayDropdown = false
  isTagSort = false
  isEdit = false
  isAdding = false
  text = ''
  tagsBak = []
  actionList = [
    {
      title: '编辑',
      value: 'edit',
      class: '',
      prefixIcon: 'hammer-outline'
    },
    {
      title: '排序',
      value: 'sort',
      class: '',
      prefixIcon: 'swap-horizontal-outline'
    },
    {
      title: '删除',
      value: 'delete',
      class: 'tag-group-delete',
      prefixIcon: 'trash-outline'
    }
  ]

  get baseParams() {
    return { acgType: this.acgType, type: this.subType }
  }

  async deleteGroup() {
    await this.$del(`tag-group/${this.data._id}`, { data: this.baseParams })
  }

  async deleteTag(id: string) {
    return this.$del(`tag/${id}`, {
      data: { groupId: this.data._id, ...this.baseParams }
    })
  }

  async saveTag(name: string) {
    return await this.$post('tag', {
      name,
      groupId: this.data._id,
      ...this.baseParams
    })
  }

  async saveTagOrder() {
    return await this.$post('tag/update_order', {
      groupId: this.data._id,
      list: this.data.tags.map((item: any) => item._id),
      ...this.baseParams
    })
  }

  async groupDelete() {
    try {
      await this.$modal.confirm({
        width: '400px',
        title: '警告',
        content: `确认要删除标签组“${this.data.name}”吗？(此操作会删除所有该标签组下面的标签)`,
        confirm: { color: 'danger' }
      })
      await this.deleteGroup()
      this.$emit('delete', this.data)
    } catch (error) {}
  }

  async handleAction(action: string) {
    this.isDisplayDropdown = false
    await this.$nextTick()
    switch (action) {
      case 'delete':
        this.groupDelete()
        break
      case 'edit':
        this.isEdit = true
        break
      case 'sort':
        this.isTagSort = true
        this.tagsBak = this.data.tags
        break
      case 'sort-save':
        const result = await this.saveTagOrder()
        this.data.tags = result
        this.isTagSort = false
        break
      case 'sort-cancel':
        this.data.tags = this.tagsBak
        this.isTagSort = false
        break
    }
  }

  async handleDeleteTag(tag: Record<string, any>) {
    try {
      await this.$modal.confirm({
        width: '300px',
        title: '警告',
        content: `确认要删除标签“${tag.name}”吗？`,
        confirm: { color: 'danger' }
      })
      const result = await this.deleteTag(tag._id)
      this.data.tags = result
    } catch (error) {}
  }

  async handleAddTag() {
    const text = this.text.trim()
    if (text) {
      this.isAdding = true
      try {
        const result = await this.saveTag(text)
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
.acg-admin-tag-group {
  height: 100%;
}

.tag-group-title {
  padding: 15px 10px;
}

.tag-group-tags {
  padding-left: 10px;
  .mz-tag {
    margin: 0 10px 10px 0;
  }

  &.is-sort {
    user-select: none;
    .tag-item {
      cursor: grab;
    }
  }
}

.tag-group-action {
  display: inline-flex;
  font-size: 0;
  .mz-icon {
    font-size: 22px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.5;
    }
  }
}

.tag-group-delete {
  color: $color-danger !important;
  .mz-list-item__title {
    color: inherit;
  }
}

.create-tag-input {
  width: calc(100% - 10px);
  margin-bottom: 10px;
}
</style>
