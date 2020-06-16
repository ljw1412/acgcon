<template>
  <mz-card class="acg-admin-tag-group"
    outlined>
    <div class="tag-group-title flex-center-space-between">
      <div>{{data.name}}</div>
      <div class="tag-group-action">
        <mz-icon v-if="sort"
          name="reorder-three"
          size="22"
          class="tag-group-reorder"></mz-icon>
        <mz-dropdown v-else
          v-model="isDisplayDropdown"
          arrow
          placement="bottom-end">
          <mz-icon name="ellipsis-horizontal-circle"
            size="22"
            class="is-pointer"></mz-icon>
          <div slot="content"
            style="width:120px;">
            <mz-list clickable
              size="medium"
              @item-click="handleDropdownItemClick">
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
      </div>
    </div>
    <div class="tag-group-tags">
      <mz-tag v-for="tag of data.tags"
        closable
        :key="tag._id">{{tag.name}}</mz-tag>
      <mz-tag class="is-pointer"
        @click="handleAddTagClick">
        <mz-icon slot="prefix"
          name="add-circle-outline"></mz-icon>
        <span style="padding-left:3px;">新增</span>
      </mz-tag>
    </div>
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

  actionList = [
    {
      title: '修改',
      value: 'update',
      class: '',
      icon: 'hammer-outline'
    },
    {
      title: '删除',
      value: 'delete',
      class: 'tag-group-delete',
      icon: 'trash-outline'
    }
  ]

  isDisplayDropdown = false
  isDeleting = false

  async deleteGroup() {
    await this.$del(`baike/filter/${this.data._id}`)
  }

  async groupDelete() {
    try {
      await this.$modal.confirm({
        width: '400px',
        content: `确认要删除标签组“${this.data.name}”吗？(此操作会删除所有该标签组下面的标签)`,
        title: '警告'
      })
      this.isDeleting = true
      await this.deleteGroup()
      this.$emit('delete', this.data)
    } catch (error) {
    } finally {
      this.isDeleting = false
    }
  }

  handleDropdownItemClick(action: string) {
    switch (action) {
      case 'delete':
        this.groupDelete()
        console.log('success')
        break
      default:
        break
    }
  }

  handleAddTagClick() {
    console.log(this.data)
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
  padding: 0 10px;
  .mz-tag {
    margin: 0 10px 10px 0;
    &:last-child {
      margin-right: 0;
    }
  }
}

.tag-group-action {
  display: inline-block;
  font-size: 0;
}

.tag-group-delete {
  color: $color-danger;
  .mz-list-item__title {
    color: inherit;
  }
}

.tag-group-reorder {
  cursor: grab;
}
</style>
