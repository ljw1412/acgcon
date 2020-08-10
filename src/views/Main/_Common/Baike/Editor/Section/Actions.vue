<template>
  <mz-row class="acg-baike-editor-actions">
    <mz-col v-for="action of actionList"
      class="lh-22 py-8 d-flex align-items-center justify-content-center border cursor-pointer user-select-none"
      v-ripple
      :span="24"
      :key="action.type"
      :style="{ width: actionWidth }"
      @click.native="$emit('insert',action.type)">
      <mz-icon size="22"
        :name="action.icon"></mz-icon>
      <span class="ml-6">{{ action.title }}</span>
    </mz-col>
  </mz-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgBaikeEditorActions extends Vue {
  actionList = [
    { title: '文字', icon: 'text-outline', type: 'text' },
    { title: '图片', icon: 'image-outline', type: 'image' },
    { title: '左右布局', icon: 'book-outline', type: 'left-right' },
    { title: '表格', icon: 'grid-outline', type: 'table' },
    { title: 'HTML', icon: 'code-working-outline', type: 'html' }
  ]

  get actionWidth() {
    return 100 / this.actionList.length + '%'
  }
}
</script>

<style lang="scss" scoped>
</style>
