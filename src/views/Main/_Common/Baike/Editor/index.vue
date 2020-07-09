<template>
  <mz-layout v-cover
    class="acg-baike-editor">
    <mz-header>
      <h1>百科编辑器</h1>
      <acg-user-avatar class="start-header__avatar" />
    </mz-header>

    <mz-main>
      <div class="editor-container">
        <editor-core :info="info"></editor-core>
        <editor-section v-for="(section,index) of sections"
          :key="index"
          :section="section"></editor-section>
        <acg-title-card style="margin-top: 20px; text-align:center;"
          @click.native="createSection">
          <mz-icon name="add-circle-sharp"
            stroke="transparent"
            size="18" />
          <span>新增板块</span>
        </acg-title-card>
      </div>
    </mz-main>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getBlankInfo, createSection } from './helper'
import EditorCore from './Core/index.vue'
import EditorSection from './Section/index.vue'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'

@Component({ components: { AcgUserAvatar, EditorCore, EditorSection } })
export default class AcgBaikeEditor extends Vue {
  info = getBlankInfo()
  sections: Acgcon.BaikeSection[] = []

  createSection() {
    this.sections.push(createSection())
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
    padding: 0 10px;
    color: $color-text-primary;
    background-color: $color-white;
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
    background-color: $color-primary;
  }
}
</style>
