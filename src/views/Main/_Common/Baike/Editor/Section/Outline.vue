<template>
  <div class="baike-editor-outline position-fixed">
    <div class="text-center py-10 border-bottom">大纲</div>
    <div class="tree px-10 fs-14">
      <div class="title py-3">{{title}}</div>
      <div v-for="(item,index) of outlineList"
        class="pl-16 py-3"
        :key="index">
        <mz-icon :name="item.icon"
          class="mr-5"></mz-icon>
        <span>{{item.desc}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MenuItem, typeIconMap, typeNameMap } from '../helper'

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
      const data: Record<string, any> = {
        item,
        type: item.type,
        icon: this.getTypeIcon(item.type)
      }

      if (item.type === 'left-right') {
        data.desc = '左右布局'
      } else if (item.type === 'text') {
        data.desc = item.data.trim().substr(0, 4) + '...'
      } else {
        data.desc = this.getTypeName(item.type)
      }

      return data
    })
  }

  getTypeIcon(type: keyof Acgcon.BaikeSectionItemTypeMap) {
    return typeIconMap[type] || ''
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
