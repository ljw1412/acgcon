<template>
  <mz-layout v-cover
    id="acg-baike-editor"
    class="h-100 overflow-hidden">

    <mz-header v-elevation="1"
      class="position-relative d-flex align-items-center justify-content-between bg-primary px-14">
      <h1 class="text-white">百科编辑器</h1>
      <acg-user-avatar class="start-header__avatar" />
    </mz-header>

    <mz-layout class="h-100">
      <mz-aside v-elevation="1"
        width="64px"
        class="bg-card">
        <editor-menu v-model="value"></editor-menu>
      </mz-aside>

      <mz-main class="overflow-auto">
        <mz-fixed-section sticky
          placeholder
          container=".mz-main"
          class="editor-header">
          <span class="section-title fs-20 lh-20">{{title}}</span>
          <mz-button color="primary">保存</mz-button>
        </mz-fixed-section>

        <div class="mx-24 my-16 p-16">
          <editor-core v-if="value === 'core'"
            :info="info"></editor-core>
        </div>
      </mz-main>
    </mz-layout>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'
import EditorMenu from './Menu.vue'
import EditorCore from './Core/index.vue'
import menuList from './menu'
import { getBlankInfo } from './helper'

@Component({ components: { AcgUserAvatar, EditorMenu, EditorCore } })
export default class AcgBaikeEditor extends Vue {
  value = 'core'
  info = getBlankInfo()

  get title() {
    const item = menuList.find(i => i.value === this.value) || { title: '' }
    return item.title
  }
}
</script>

<style lang="scss">
#acg-baike-editor {
  color: $color-text-primary;

  .editor-header {
    > .mz-fixed-section {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      backdrop-filter: blur(5px);
      z-index: 900;
    }
  }
}
</style>
