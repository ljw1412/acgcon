<template>
  <mz-dropdown-menu :data="typeList"
    class="baike-editor-type-dropdown-menu"
    v-on="$listeners">
    <slot></slot>
  </mz-dropdown-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { sectionItemTypeList } from '../helper'

@Component
export default class BaikeEditorTypeDropdownMenu extends Vue {
  get typeList() {
    return sectionItemTypeList.map(item => {
      return {
        ...item,
        value: item.type,
        prefixIcon: item.icon
      }
    })
  }
}
</script>

<style lang="scss">
</style>
