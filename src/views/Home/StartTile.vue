<template>
  <div class="start-tile"
    :class="{
      'start-tile--h2': h === 2,
      'start-tile--w2': w === 2
    }"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class StartTile extends Vue {
  @Prop(Number)
  readonly w!: number
  @Prop(Number)
  readonly h!: number
}
</script>

<style lang="scss">
.start-tile {
  display: inline-block;
  width: 192px;
  height: 192px;
  margin-bottom: 16px;
  font-size: 16px;
  background-color: #ffffff;
  &--h2 {
    height: 400px;
  }
  &--w2 {
    width: 400px;
  }
}
</style>