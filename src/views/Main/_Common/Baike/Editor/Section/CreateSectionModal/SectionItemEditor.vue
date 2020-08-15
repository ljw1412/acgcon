<template>
  <div class="baike-section-item-editor">

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { typeNameMap } from '../../helper'

@Component
export default class BaikeSectionItemEditor extends Vue {
  @Prop(String)
  readonly type!: keyof Acgcon.BaikeSectionItemTypeMap

  typeMap = typeNameMap
  mType = ''
}
</script>

<style lang="scss">
</style>
