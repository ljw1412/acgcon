<template>
  <mz-fixed-section sticky
    placeholder
    container="#baike-editor-content"
    class="editor-header"
    :class="{'has-outline': hasOutline}">
    <div class="section-title d-flex align-items-center"
      v-hover="{
          enter: () => hover = true,
          leave: () => hover = false
      }">
      <mz-icon v-show="editable && hover || isEdit"
        size="20"
        name="pencil-sharp"
        class="mr-10"></mz-icon>
      <!-- 编辑状态 -->
      <span v-if="isEdit"
        class="section-title-field d-flex align-items-center">
        <mz-input v-model="mTitle"
          ref="input"
          size="medium"
          class="mr-6 fs-20"></mz-input>
        <mz-icon v-tooltip="'更新'"
          size="24"
          name="checkmark-circle-outline"
          class="cursor-pointer text-success flex-shrink-0"
          @click="handleUpdateTitle"></mz-icon>
        <mz-icon v-tooltip="'取消'"
          size="24"
          name="close-circle-outline"
          class="cursor-pointer text-danger flex-shrink-0"
          @click="handleCancelTitle"></mz-icon>
      </span>
      <!-- 普通状态 -->
      <span v-else
        v-tooltip.bottom.arrow=" editable ? '点击编辑标题' : '' "
        class="fs-20 lh-20 cursor-pointer"
        style="min-width: 100px; min-height: 20px;"
        @click="handleTitleClick">{{title}}</span>
    </div>

    <div>
      <mz-button v-if="removable"
        color="danger"
        class="mr-10"
        outlined
        @click="handleRemoveClick">删除</mz-button>
      <mz-button color="primary"
        outlined
        @click="handleSaveClick">保存</mz-button>
    </div>
  </mz-fixed-section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'

@Component
export default class BaikeEditorHeader extends Vue {
  @Prop(String)
  readonly title!: string
  @Prop(Boolean)
  readonly editable!: boolean
  @Prop(Boolean)
  readonly removable!: boolean
  @Prop(Boolean)
  readonly hasOutline!: boolean
  @Ref('input')
  readonly inputRef!: HTMLInputElement

  mTitle = ''
  hover = false
  isEdit = false

  handleTitleClick() {
    if (!this.editable) return false
    this.mTitle = this.title || ''
    this.isEdit = true
    this.$nextTick(() => {
      this.inputRef && this.inputRef.focus()
    })
  }

  handleUpdateTitle() {
    this.$emit('title-update', this.mTitle)
    this.isEdit = false
    this.hover = false
  }

  @Watch('editable', { immediate: true })
  handleCancelTitle() {
    this.isEdit = false
    this.hover = false
  }

  async handleRemoveClick() {
    try {
      await this.$modal.confirm({
        title: '删除确认',
        content: `确认删除模块[${this.title}]?`,
        confirm: { color: 'danger' }
      })
      this.$emit('remove')
    } catch (error) {}
  }

  handleSaveClick() {
    this.$emit('save')
  }
}
</script>

<style lang="scss">
.editor-header {
  &.has-outline {
    padding-left: 220px;
  }

  > .mz-fixed-section {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(5px);
    z-index: 100;
  }

  .section-title-field {
    > .mz-icon {
      @include clickable();
    }
  }
}
</style>
