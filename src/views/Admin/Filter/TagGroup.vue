<template>
  <mz-card outlined
    class="acg-admin-tag-group"
    :class="{'is-edit': isEdit}">
    <div class="tag-group-header d-flex align-items-center justify-content-between">
      <div class="tag-group-title">
        <span class="tag-group-name"
          @click="isEdit && $emit('rename',data)">{{data.name}}</span>
        <template v-if="!isEdit">
          <mz-tag v-if="data.multiple"
            round
            outlined
            color="var(--color-text-primary)"
            size="small">多选</mz-tag>
        </template>
        <template v-else>
          <mz-switch v-model="data.multiple"
            size="small"
            @change="$emit('multiple-change', $event, data)"></mz-switch>
          <span style="font-size:14px;margin-left: 4px;">{{data.multiple?'多选':'单选'}}</span>
        </template>
      </div>
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

    <!-- 标签组下的标签列表 -->
    <draggable v-show="!sort"
      v-model="data.tags"
      tag="div"
      class="tag-group-tags"
      filter=".tag-item--all"
      :class="{'is-sort':isTagSort}"
      :draggable="isTagSort?'.tag-item':''">
      <transition-group tag="div"
        name="flip-list">
        <mz-tag v-for="tag of data.tags"
          v-elevation="isTagSort && !tag.isAll ? 5 : 0"
          :class="tag.isAll ? 'tag-item--all' : 'tag-item'"
          :closable="isEdit && !tag.isAll"
          :key="tag._id"
          @close="handleDeleteTag(tag)">{{tag.name}}</mz-tag>
      </transition-group>
      <!-- 新增输入框 -->
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
import { TagManager } from './action'

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

  tagManager!: TagManager
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
    return {
      groupId: this.data._id,
      acgType: this.acgType,
      subType: this.subType
    }
  }

  async handleAction(action: string) {
    this.isDisplayDropdown = false
    await this.$nextTick()
    switch (action) {
      case 'delete':
        this.$emit('delete', this.data)
        break
      case 'edit':
        this.isEdit = true
        break
      case 'sort':
        this.isTagSort = true
        this.tagsBak = this.data.tags
        break
      case 'sort-save':
        const result = await this.tagManager.updateOrder(
          this.data.tags.map((item: any) => item._id)
        )
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
    const result = await this.tagManager.delete(tag)
    result && (this.data.tags = result)
  }

  async handleAddTag() {
    const text = this.text.trim()
    if (text) {
      this.isAdding = true
      try {
        const result = await this.tagManager.create(text)
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

  created() {
    this.tagManager = new TagManager(this)
  }
}
</script>

<style lang="scss">
.acg-admin-tag-group {
  height: 100%;
}

.tag-group-header {
  padding: 15px 10px;
}

.tag-group-title {
  display: flex;
  align-items: center;
}

.tag-group-name {
  margin-right: 4px;
}

.acg-admin-tag-group.is-edit .tag-group-name {
  cursor: pointer;
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
    @include clickable;
  }
}

.tag-group-delete {
  color: $danger !important;
  .mz-list-item__title {
    color: inherit;
  }
}

.create-tag-input {
  width: calc(100% - 10px);
  margin-bottom: 10px;
}
</style>
