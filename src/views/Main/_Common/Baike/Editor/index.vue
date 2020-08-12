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
        <editor-menu v-model="value"
          :menu-list="menuList"
          @create-module="createModule"></editor-menu>
      </mz-aside>

      <mz-main class="overflow-auto"
        id="baike-editor-content">
        <editor-header :title="title"
          :editable="value !== 'core'"
          :removable="value !== 'core'"
          @title-update="handleTitleUpdate"
          @save="handleSectionSave"
          @remove="handleSectionRemove"></editor-header>

        <div class="mx-24 my-16 p-16">
          <editor-core v-if="value === 'core'"
            :info="info"></editor-core>
          <editor-section v-else></editor-section>
        </div>
      </mz-main>
    </mz-layout>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'
import EditorMenu from './Menu.vue'
import EditorHeader from './Header.vue'
import EditorCore from './Core/index.vue'
import EditorSection from './Module/index.vue'
import { getBlankInfo, getBaseMenu, MenuItem } from './helper'

@Component({
  components: {
    AcgUserAvatar,
    EditorMenu,
    EditorHeader,
    EditorCore,
    EditorSection
  }
})
export default class AcgBaikeEditor extends Vue {
  value = 'core'
  info = getBlankInfo()
  menuList = getBaseMenu()

  get currentModule() {
    return this.menuList.find(i => i.value === this.value)
  }

  get title() {
    return this.currentModule ? this.currentModule.title : ''
  }

  createModule(module: MenuItem) {
    this.menuList.push(module)
    this.value = module.value
  }

  handleTitleUpdate(title: string) {
    if (this.currentModule) {
      this.currentModule.title = title
    }
  }

  handleSectionSave() {}

  handleSectionRemove() {
    if (this.currentModule) {
      this.menuList.remove(this.currentModule)
      this.value = 'core'
    }
  }
}
</script>

<style lang="scss">
#acg-baike-editor {
  color: $color-text-primary;

  .mz-aside {
    z-index: 150;
  }
}
</style>
