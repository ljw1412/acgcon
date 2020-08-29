<template>
  <div class="editor-section-item"
    :class="{ 'is-active': active }">
    <div class="section-type user-select-none">{{type}}</div>
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

  .section-type {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    font-size: 14px;
    line-height: 14px;
    padding: 2px 4px;
    background-color: $section-helper-theme;
  }

  &::before {
    z-index: -1;
  }

  &.is-active,
  &:hover {
    @include foreground;
    border-color: $section-helper-theme;

    .section-type {
      display: block;
    }
  }
}
</style>
