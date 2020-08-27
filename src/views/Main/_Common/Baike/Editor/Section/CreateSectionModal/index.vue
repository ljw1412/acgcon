<template>
  <mz-modal v-model="mVisible"
    closeable
    class="baike-editor-create-section-modal"
    :title="title"
    :close-on-click-mask="false">

    <template v-if="isTextarea">
      <mz-textarea v-model="data"
        ref="textarea"
        placeholder="请输入文字内容"></mz-textarea>
    </template>

    <template v-if="type === 'image'">
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
        @click="handleSave">{{operationName}}</mz-button>
    </template>
  </mz-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch, Ref } from 'vue-property-decorator'
import SectionItemEditor from './SectionItemEditor.vue'
import { typeNameMap } from '../../helper'
import MzTextarea from 'manzhai-ui/types/packages/Textarea'

@Component({ components: { SectionItemEditor } })
export default class BaikeEditorCreateSectionModal extends Vue {
  @Model('visible:change', Boolean)
  readonly visible!: boolean
  @Prop(String)
  readonly type!: keyof Acgcon.BaikeSectionItemTypeMap
  @Prop(Boolean)
  readonly isEdit!: boolean
  @Ref('textarea')
  readonly textareaRef!: MzTextarea

  data = ''
  style = ''
  double = { left: {}, right: {} }

  get mVisible() {
    return this.visible
  }

  set mVisible(visible) {
    this.$emit('visible:change', visible)
  }

  get operationName() {
    return this.isEdit ? '更新' : '插入'
  }

  get title() {
    return this.operationName + (typeNameMap[this.type] || '')
  }

  get isTextarea() {
    return ['text', 'html'].includes(this.type)
  }

  get isHTML() {
    return this.type === 'html'
  }

  get allowSave() {
    return this.isTextarea && this.data.trim().length
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
    this.$emit('save', { type: this.type, data: this.data, style: this.style })
    this.mVisible = false
  }

  @Watch('visible')
  onVisibleChange(visible: boolean) {
    if (!visible) {
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
