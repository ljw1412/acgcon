<template>
  <mz-scrollbar id="baike-editor-menu"
    class="h-100"
    bar-size="4px"
    :always="false">
    <mz-list v-model="mValue">
      <mz-list-item v-for="item of menuList"
        v-tooltip.arrow.right="item.title"
        class="cursor-pointer"
        :key="item.value"
        :value="item.value">
        <div class="menu-item d-flex align-items-center justify-content-center">
          <mz-icon :name="item.icon"
            size="30"></mz-icon>
        </div>
      </mz-list-item>
    </mz-list>

    <mz-list-item v-tooltip.arrow.right="'新增板块'"
      clickable
      @click="addSection">
      <div class="menu-item d-flex align-items-center justify-content-center">
        <mz-icon name="add-circle-outline"
          size="30"></mz-icon>
      </div>
    </mz-list-item>
  </mz-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'
import { createSection } from './helper'

@Component
export default class BaikeEditorMenu extends Vue {
  @Model('change:value', String)
  readonly value!: string
  @Prop({ type: Array, default: () => [] })
  readonly menuList!: Acgcon.BaikeSection[]

  get mValue() {
    return this.value
  }

  set mValue(value: string) {
    this.$emit('change:value', value)
  }

  addSection() {
    const newSection = createSection()
    this.$emit('create-section', newSection)
  }
}
</script>

<style lang="scss">
#baike-editor-menu {
  .menu-item {
    width: 100%;
    height: 64px;
  }
}
</style>
