<template>
  <div class="acg-home-menu-tile mb-16">
    <div class="tile fs-16"
      :class="{
        'h-2': h === 2,
        'h-3': h === 3,
        'w-2': w === 2,
        'cursor-pointer': pointer || to || href
      }"
      @click="handleClick">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RawLocation } from 'vue-router'

@Component
export default class AcgHomeMenuTile extends Vue {
  @Prop(Number)
  readonly w!: number
  @Prop(Number)
  readonly h!: number
  @Prop(Boolean)
  readonly pointer!: boolean
  @Prop(Boolean)
  readonly replace!: boolean
  @Prop()
  readonly to!: RawLocation
  @Prop(String)
  readonly href!: string

  handleClick(e: MouseEvent) {
    this.$emit('click', e)
    if (this.to) {
      this.$router[this.replace ? 'replace' : 'push'](this.to)
    } else if (this.href) {
      this.replace ? location.replace(this.href) : (location.href = this.href)
    }
  }
}
</script>

<style lang="scss">
.acg-home-menu-tile {
  display: inline-block;

  .tile {
    width: 192px;
    height: 192px;
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(5px);
    &.h-2 {
      height: 400px;
    }
    &.h-3 {
      height: 608px;
    }
    &.w-2 {
      width: 400px;
    }
  }
}

:root[data-theme='dark'] {
  .acg-home-menu-tile .tile {
    background-color: rgba(0, 0, 0, 0.75);
  }
}
</style>
