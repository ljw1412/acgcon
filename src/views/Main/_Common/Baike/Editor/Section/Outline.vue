<template>
  <div class="baike-editor-outline-wrapper">
    <mz-button icon
      class="btn-fold position-fixed"
      @click="$emit('update:isFold',!isFold)">
      <mz-icon name="list-outline"
        size="20"></mz-icon>
    </mz-button>

    <div v-show="!isFold"
      class="baike-editor-outline position-fixed">
      <div class="outline-header text-center py-10 border-bottom">大纲</div>
      <div class="tree px-10 fs-14">
        <div class="title py-8">{{title}}</div>
        <div v-for="(item,index) of outlineList"
          class="tree-item pl-16 py-5"
          :key="index">
          <mz-icon :name="item.icon"
            class="mr-5"></mz-icon>
          <span>{{item.desc}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { typeIconMap, typeNameMap } from '../helper'

@Component
export default class BaikeEditorOutline extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly section!: Acgcon.BaikeSection
  @Prop(Boolean)
  readonly isFold!: boolean

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
        data.desc = item.data.trim().substr(0, 8) + '...'
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
.baike-editor-outline-wrapper {
  .btn-fold {
    left: 64px + 5;
    top: 64px + 5;
    z-index: 1;
  }
}

.baike-editor-outline {
  left: 64px;
  top: 64px;
  height: 100%;
  width: 220px;
  background-color: $card-bg;

  .tree-item {
    cursor: pointer;
    position: relative;
    &:hover {
      @include foreground;
    }
  }
}
</style>
