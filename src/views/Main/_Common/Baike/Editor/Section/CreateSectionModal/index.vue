<template>
  <mz-modal v-model="mVisible"
    closeable
    class="baike-editor-create-section-modal"
    :title="title"
    :close-on-click-mask="false">

    <template v-if="type === 'text'">
      <mz-textarea v-model="data"></mz-textarea>
    </template>

    <template #footer>
      <mz-button color="primary"
        @click="handleSave">{{operationName}}</mz-button>
    </template>
  </mz-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'
import SectionItemEditor from './SectionItemEditor.vue'
import { typeNameMap } from '../../helper'

@Component({ components: { SectionItemEditor } })
export default class BaikeEditorCreateSectionModal extends Vue {
  @Model('visible:change', Boolean)
  readonly visible!: boolean
  @Prop(String)
  readonly type!: keyof Acgcon.BaikeSectionItemTypeMap
  @Prop(Boolean)
  readonly isEdit!: boolean

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

  clearData() {
    this.data = ''
    this.style = ''
    this.double = { left: {}, right: {} }
  }

  handleSave() {
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
</style>
