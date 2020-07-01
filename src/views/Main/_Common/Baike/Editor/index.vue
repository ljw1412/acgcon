<template>
  <mz-layout class="acg-baike-editor">
    <mz-header>
      <h1>百科编辑器</h1>
      <acg-user-avatar class="start-header__avatar" />
    </mz-header>

    <mz-main class="editor-container">
      <mz-card>
        <core :info="info"></core>
      </mz-card>

    </mz-main>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getBlankInfo } from './helper'
import Core from './Core.vue'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'

@Component({ components: { Core, AcgUserAvatar } })
export default class AcgBaikeEditor extends Vue {
  info = getBlankInfo()
}
</script>

<style lang="scss">
.acg-baike-editor {
  .mz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: $color-text-primary;
  }

  .editor-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
