<template>
  <div class="acg-between-layout d-flex justify-content-between"
    :class="`align-items-${valign}`">
    <div class="layout-left"
      :class="leftClass"
      :style="leftStyle">
      <slot name="left"></slot>
    </div>
    <div class="layout-right"
      :class="rightClass"
      :style="rightStyle">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBetweenLayout extends Vue {
  @Prop({ type: String, default: 'center' })
  valign!: 'top' | 'center' | 'bottom'
  @Prop()
  leftClass!: any
  @Prop()
  leftStyle!: any
  @Prop()
  rightClass!: any
  @Prop()
  rightStyle!: any
}
</script>

<style lang="scss">
</style>
