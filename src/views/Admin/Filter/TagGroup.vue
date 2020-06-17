<template>
  <mz-card class="acg-admin-tag-group"
    outlined>
    <div class="tag-group-title flex-center-space-between">
      <div>{{data.name}}</div>
      <div class="tag-group-action">
        <mz-icon v-if="sort"
          name="reorder-three"
          class="tag-group-reorder"
          style="cursor: grab;"></mz-icon>
        <mz-dropdown v-else-if="!isEdit && !isTagSort"
          v-model="isDisplayDropdown"
          arrow
          placement="bottom-end">
          <mz-icon name="ellipsis-horizontal-circle"></mz-icon>
          <div slot="content"
            style="width:120px;">
            <mz-list clickable
              size="medium"
              @item-click="handleAction">
              <mz-list-item v-for="item of actionList"
                :key="item.value"
                :title="item.title"
                :class="item.class"
                :value="item.value">
                <mz-icon slot="prefix"
                  :name="item.icon"
                  size="16"></mz-icon>
              </mz-list-item>
            </mz-list>
          </div>
        </mz-dropdown>
        <template v-else>
          <mz-icon v-tooltip.bottom="'取消'"
            name="close-circle-outline"
            class="mz-danger--text"
            @click="handleAction('cancel')"></mz-icon>
          <mz-icon v-tooltip.bottom="'保存'"
            name="checkmark-circle-outline"
            class="mz-success--text"></mz-icon>
        </template>
      </div>
    </div>

    <draggable v-show="!sort"
      v-model="data.tags"
      tag="div"
      class="tag-group-tags"
      :class="{'is-edit':isTagSort}"
      :draggable="isTagSort?'.tag-item':''">
      <transition-group tag="div"
        name="flip-list">
        <mz-tag v-for="tag of data.tags"
          class="tag-item"
          :closable="isEdit"
          :key="tag._id">{{tag.name}}</mz-tag>
      </transition-group>
      <mz-input v-show="isEdit"
        slot="footer"
        v-model="text"
        size="medium"
        class="create-tag-input"
        placeholder="输入新增的标签名称，回车添加"
        @keydown.native.enter="handleAddTag">
        <mz-icon slot="suffix"
          name="return-down-back-outline"></mz-icon>
      </mz-input>
    </draggable>
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgAdminTagGroup extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Record<string, any>
  @Prop(Boolean)
  readonly sort!: boolean

  isDisplayDropdown = false
  isTagSort = false
  isEdit = false
  text = ''
  tagsBak = []
  actionList = [
    {
      title: '编辑',
      value: 'edit',
      class: '',
      icon: 'hammer-outline'
    },
    {
      title: '排序',
      value: 'sort',
      class: '',
      icon: 'swap-horizontal-outline'
    },
    {
      title: '删除',
      value: 'delete',
      class: 'tag-group-delete',
      icon: 'trash-outline'
    }
  ]

  async deleteGroup() {
    await this.$del(`baike/filter/${this.data._id}`)
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
      case 'cancel':
        if (this.isTagSort) {
          this.data.tags = this.tagsBak
          this.isTagSort = false
        } else if (this.isEdit) {
          this.isEdit = false
        }
        break
    }
  }

  handleAddTag() {
    const text = this.text.trim()
    if (text) {
      console.log(text)
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

  &.is-edit {
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
