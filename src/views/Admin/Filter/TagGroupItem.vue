<template>
  <div class="admin-filter-tag-group-item bg-card rounded-sm">
    <div class="header d-flex align-items-center justify-content-between border-bottom px-16">
      <div class="title py-16 lh-22">
        <div class="font-weight-bold">{{data.name}}</div>
      </div>
      <div>
        <tag-group-action :state="state"
          @action="handleAction"></tag-group-action>
      </div>
    </div>
    <div v-show="!isGroupSort"
      class="content p-16">
      <tag-group-grid :state="state"
        :data="data"></tag-group-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TagGroupAction from './TagGroupAction'
import TagGroupGrid from './TagGroupGrid.vue'
import { updateTagOrder } from '../../../services/tag'

@Component({ components: { TagGroupGrid, TagGroupAction } })
export default class AdminFilterTagGroupItem extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Record<string, any>

  state = 'normal'
  tagsBak = []

  get isGroupSort() {
    return this.state === 'group-sort'
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
