<template>
  <mz-scrollbar id="acg-editor-menu"
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
      @click="addModule">
      <div class="menu-item d-flex align-items-center justify-content-center">
        <mz-icon name="add-circle-outline"
          size="30"></mz-icon>
      </div>
    </mz-list-item>
  </mz-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'
import { MenuItem, createModule } from './helper'

@Component
export default class AcgEditorMenu extends Vue {
  @Model('change:value', String)
  readonly value!: string
  @Prop({ type: Array, default: () => [] })
  readonly menuList!: MenuItem[]

  get mValue() {
    return this.value
  }

  set mValue(value: string) {
    this.$emit('change:value', value)
  }

  addModule() {
    const newModule = createModule()
    this.$emit('create-module', newModule)
  }
}
</script>

<style lang="scss">
#acg-editor-menu {
  .menu-item {
    width: 100%;
    height: 64px;
  }
}
</style>
