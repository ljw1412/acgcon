<template>
  <div v-show="empty"
    class="baike-editor-content-empty">
    <div class="text">该模块还没有内容</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaikeEditorContentEmpty extends Vue {
  @Prop(Boolean)
  readonly empty!: boolean
}
</script>

<style lang="scss">
.baike-editor-content-empty {
  height: 100px;
  text-align: center;
}
</style>
