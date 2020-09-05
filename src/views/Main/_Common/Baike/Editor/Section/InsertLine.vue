<template>
  <editor-type-dropdown-menu @action="handleInsertAction">
    <div class="insert-line position-relative py-3 cursor-pointer d-flex align-items-center">
      <div class="line"></div>
      <div class="plus-icon">
        <mz-icon name="add-circle"
          size="16"></mz-icon>
      </div>
      <div class="line"></div>
    </div>
  </editor-type-dropdown-menu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import EditorTypeDropdownMenu from './TypeDropdownMenu.vue'

@Component({ components: { EditorTypeDropdownMenu } })
export default class BaikeEditorInsertLine extends Vue {
  @Prop(Number)
  readonly index!: number

  handleInsertAction(type: string, item: any) {
    this.$emit('action', type, item, this.index)
  }
}
</script>

<style lang="scss">
.insert-line {
  .line {
    width: 100%;
    height: 2px;
    background-color: $gray-700;
  }
}
</style>
