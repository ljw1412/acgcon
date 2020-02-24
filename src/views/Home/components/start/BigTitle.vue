<template>
  <div class="big-title flex-double-center">
    <span v-html="html"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class StartBigTitle extends Vue {
  @Prop(String)
  readonly html!: string
}
</script>

<style lang="scss">
.big-title {
  width: 100%;
  height: 100%;
  font-size: 30px;
  > span {
    padding-left: 0.5em;
    letter-spacing: 0.5em;
    line-height: 1.5em;
  }
}
</style>