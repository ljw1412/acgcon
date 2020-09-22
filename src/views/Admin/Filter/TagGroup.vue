<template>
  <draggable v-model="mList"
    class="admin-filter-tag-group text-gray-900"
    group="tag-group"
    handle=".tag-group-reorder"
    ghost-class="is-ghost">
    <transition-group tag="mz-row"
      name="flip-list">
      <mz-col v-for="item of list"
        class="tag-group"
        :key="item._id"
        :md="12"
        :lg="8">
        <tag-group-item :data="item"
          @delete="(item)=>$emit('delete',item)"></tag-group-item>
      </mz-col>
    </transition-group>
  </draggable>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator'
import TagGroupItem from './TagGroupItem.vue'

@Component({ components: { TagGroupItem } })
export default class AdminFilterTagGroup extends Vue {
  @Model('list:change', { type: Array, default: () => [] })
  readonly list!: Record<string, any>[]

  get mList() {
    return this.list
  }

  set mList(val) {
    this.$emit('list:change', val)
  }
}
</script>

<style lang="scss">
.admin-filter-tag-group {
  > .mz-row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
    > .mz-col {
      padding-left: 5px;
      padding-right: 5px;
      margin-bottom: 10px;
    }
  }

  .tag-group.is-ghost {
    opacity: 0.5;
  }
}
</style>
