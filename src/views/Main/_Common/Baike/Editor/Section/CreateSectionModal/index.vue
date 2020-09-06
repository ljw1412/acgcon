<template>
  <mz-modal v-model="mVisible"
    closeable
    class="baike-editor-create-section-modal"
    title="编辑"
    width="800px"
    :close-on-click-mask="false">

    <template v-if="isTextarea">
      <mz-textarea v-model="data"
        ref="textarea"
        rows="10"
        placeholder="请输入文字内容"></mz-textarea>
    </template>

    <template v-if="section.type === 'image'">
      <p class="mb-6">
        <span>您可以上传图片：</span>
        <mz-button color="primary">上传图片</mz-button>
      </p>
      <p class="mt-4 mb-6">或者直接输入图片的地址：</p>
      <mz-input v-model="data"
        placeholder="请输入图片地址"></mz-input>
    </template>

    <template #footer>
      <mz-button color="primary"
        :class="{'not-save': !allowSave}"
        @click="handleSave">保存</mz-button>
    </template>
  </mz-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch, Ref } from 'vue-property-decorator'
import { typeNameMap } from '../../helper'
import MzTextarea from 'manzhai-ui/types/packages/Textarea'

@Component
export default class BaikeEditorCreateSectionModal extends Vue {
  @Model('visible:change', Boolean)
  readonly visible!: boolean
  @Prop({ type: Object, default: () => ({}) })
  readonly section!: Acgcon.BaikeSectionItem
  @Ref('textarea')
  readonly textareaRef!: MzTextarea

  data: any = ''
  style = ''
  double = { left: {}, right: {} }

  get mVisible() {
    return this.visible
  }

  set mVisible(visible) {
    this.$emit('visible:change', visible)
  }

  get isTextarea() {
    return ['text', 'html'].includes(this.section.type)
  }

  get isHTML() {
    return this.section.type === 'html'
  }

  get allowSave() {
    return this.data.trim().length
  }

  clearData() {
    this.data = ''
    this.style = ''
    this.double = { left: {}, right: {} }
  }

  handleSave() {
    if (!this.allowSave) {
      if (this.isTextarea) this.textareaRef.focus()
      return
    }
    if (this.isHTML && this.data.includes('<script')) {
      this.$snackbar.show({ color: 'danger', content: '存在不合法的内容' })
      return
    }
    if (this.section.type !== 'left-right') {
      this.section.data = this.data
      this.section.style = this.style
    }
    this.mVisible = false
  }

  @Watch('visible')
  onVisibleChange(visible: boolean) {
    if (visible) {
      if (this.section.type !== 'left-right' && this.section.data) {
        this.data = this.section.data
        this.style = this.section.style || ''
      }
    } else {
      this.clearData()
    }
  }
}
</script>

<style lang="scss">
.baike-editor-create-section-modal {
  .not-save {
    opacity: 0.75;
  }
}
</style>
