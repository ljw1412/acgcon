<template>
  <div class="baike-editor-description bg-card p-10">
    <div class="fs-20 mb-10">描述</div>
    <mz-textarea v-model="mValue"
      rows='10'
      placeholder="请输入描述内容"></mz-textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator'

@Component
export default class BaikeEditorDescription extends Vue {
  @Model('value:change', { type: String, default: '' })
  readonly value!: string

  get mValue() {
    return this.value
  }

  set mValue(val: string) {
    this.$emit('value:change', val)
  }
}
</script>

<style lang="scss">
</style>
