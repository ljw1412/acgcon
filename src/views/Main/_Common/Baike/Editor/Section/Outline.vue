<template>
  <div class="acg-baike-editor-outline position-fixed">
    <div class="text-center py-10 border-bottom">大纲</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgBaikeEditorOutline extends Vue {}
</script>

<style lang="scss">
.acg-baike-editor-outline {
  right: 0;
  top: 128px;
  height: 100%;
  width: 160px;
  background-color: $card-bg;
}
</style>
