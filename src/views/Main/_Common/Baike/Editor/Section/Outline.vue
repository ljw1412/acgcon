<template>
  <div class="baike-editor-outline position-fixed">
    <div class="text-center py-10 border-bottom">大纲</div>
    <div class="tree px-10 fs-14">
      <div class="title py-3">{{title}}</div>
      <div v-for="(item,index) of outlineList"
        class="pl-16 py-3"
        :key="index">{{item.type}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MenuItem, typeNameMap } from '../helper'

@Component
export default class BaikeEditorOutline extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly section!: MenuItem

  get title() {
    return this.section.title || 'ROOT'
  }

  get items() {
    return this.section.items || []
  }

  get outlineList() {
    return this.items.map(item => {
      return { type: this.getTypeName(item.type), item }
    })
  }

  getTypeName(type: keyof Acgcon.BaikeSectionItemTypeMap) {
    return typeNameMap[type] || '???'
  }
}
</script>

<style lang="scss">
.baike-editor-outline {
  right: 0;
  top: 128px;
  height: 100%;
  width: 160px;
  background-color: $card-bg;
}
</style>
