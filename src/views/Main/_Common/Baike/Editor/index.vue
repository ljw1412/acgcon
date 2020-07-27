<template>
  <mz-layout v-cover
    class="acg-baike-editor">
    <mz-header>
      <h1>百科编辑器</h1>
      <acg-user-avatar class="start-header__avatar" />
    </mz-header>
    <mz-layout>
      <mz-aside class="text-primary"
        width="80px">
        <editor-sidebar v-model="currentSectionId"
          @create-section="createSection"></editor-sidebar>
      </mz-aside>

      <mz-layout>
        <mz-main>
          <div class="editor-container">
            <component :is="currentSectionId==='core'?'editor-core':'editor-section'"
              :info="info"
              :section="currentSection"></component>
          </div>
        </mz-main>

        <mz-footer class="bg-card text-primary"
          style="height: 40px; text-align:right;">
          <mz-button color="primary">保存</mz-button>
        </mz-footer>
      </mz-layout>
    </mz-layout>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getBlankInfo, createSection } from './helper'
import EditorCore from './Core/index.vue'
import EditorSidebar from './Sidebar.vue'
import EditorSection from './Section/index.vue'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'

@Component({
  components: { AcgUserAvatar, EditorSidebar, EditorCore, EditorSection }
})
export default class AcgBaikeEditor extends Vue {
  currentSectionId = 'core'
  info = getBlankInfo()
  sections: Acgcon.BaikeSection[] = []

  get currentSection() {
    return {}
  }

  createSection() {
    this.sections.push(createSection('自定义板块'))
  }
}
</script>

<style lang="scss">
.acg-baike-editor {
  height: 100%;
  overflow: hidden;

  .mz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: $color-text-primary;
    background-color: $white;
  }

  .mz-footer {
    box-sizing: border-box;
    padding: 4px;
  }

  .mz-main {
    padding: 20px 0;
    overflow-y: auto;
  }

  .editor-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
}

:root[data-theme='dark'] {
  .acg-baike-editor .mz-header {
    background-color: $primary;
  }
}
</style>
