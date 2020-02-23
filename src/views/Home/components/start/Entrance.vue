<template>
  <div class="start-entrance">
    {{title}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class StartEntrance extends Vue {
  @Prop(String)
  readonly title!: string
}
</script>

<style lang="scss">
</style>