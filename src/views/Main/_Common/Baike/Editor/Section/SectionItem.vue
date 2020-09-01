<template>
  <div class="editor-section-item"
    :class="{ 'is-active': active }">
    <div class="section-item-type user-select-none">{{type}}</div>
    <div v-if="item.type!=='left-right' && !item.data"
      class="section-item-placeholder text-gray-500">
      <em>&lt;请点击编辑{{type}}内容&gt;</em>
    </div>
    <section-item v-bind="item"></section-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SectionItem from '../../Detail/SectionItem'
import { typeNameMap } from '../helper'

@Component({ components: { SectionItem } })
export default class BaikeEditorSectionItem extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: Acgcon.BaikeSectionItem
  @Prop(Boolean)
  readonly active!: boolean

  get type() {
    return typeNameMap[this.item.type] || this.item.type
  }
}
</script>

<style lang="scss">
$section-helper-theme: $success;

.editor-section-item {
  position: relative;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px dashed transparent;
  font-size: 16px;
  min-height: 22px;

  .section-item-type {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    font-size: 14px;
    line-height: 14px;
    padding: 2px 4px;
    background-color: $section-helper-theme;
    z-index: 1;
  }

  &::before {
    z-index: -1;
  }

  &.is-active,
  &:hover {
    @include foreground;
    border-color: $section-helper-theme;

    .section-item-type {
      display: block;
    }
  }
}
</style>
