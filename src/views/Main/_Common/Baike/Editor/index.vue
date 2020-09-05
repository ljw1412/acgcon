<template>
  <mz-layout v-cover
    id="baike-editor"
    class="h-100 overflow-hidden">

    <mz-header v-elevation="1"
      class="position-relative d-flex align-items-center justify-content-between bg-primary px-14">
      <h1 class="text-white">百科编辑器</h1>
      <acg-user-avatar class="start-header__avatar" />
    </mz-header>

    <mz-layout class="h-100">
      <mz-aside v-elevation="1"
        width="64px">
        <editor-menu v-model="value"
          :menu-list="menuList"
          @create-section="createSection"></editor-menu>
      </mz-aside>

      <mz-main class="overflow-auto"
        id="baike-editor-content"
        :style="value!=='core' && !isOutlineFold ? 'margin-left: 220px;' : ''">
        <editor-header :title="title"
          :editable="value !== 'core'"
          :removable="value !== 'core'"
          @title-update="handleTitleUpdate"
          @save="handleSectionSave"
          @remove="handleSectionRemove"></editor-header>

        <div class="mx-24 my-16 p-16">
          <editor-core v-if="value === 'core'"
            :info="info"></editor-core>
          <editor-section v-else
            :section="currentSection"
            :is-outline-fold.sync="isOutlineFold"
            @section-save="handleSaveSectionItem"></editor-section>
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
import EditorSection from './Section/index.vue'
import { getBlankInfo, getBaseMenu } from './helper'
import { baikeInfo, baikeSections } from '../../../../../configs/mock'

@Component({
  components: {
    AcgUserAvatar,
    EditorMenu,
    EditorHeader,
    EditorCore,
    EditorSection
  }
})
export default class BaikeEditor extends Vue {
  value = 'core'
  info = getBlankInfo()
  menuList = getBaseMenu()
  isOutlineFold = false

  get currentSection() {
    return this.menuList.find(i => i._id === this.value)
  }

  get title() {
    return this.currentSection ? this.currentSection.title : ''
  }

  createSection(section: Acgcon.BaikeSection) {
    this.menuList.push(section)
    this.value = section._id!
  }

  handleTitleUpdate(title: string) {
    if (this.currentSection) {
      this.currentSection.title = title
    }
  }

  handleSaveSectionItem(item: Acgcon.BaikeSectionItem, index?: number) {
    console.log(item, index)
    if (this.currentSection && this.currentSection.items) {
      if (index === undefined) {
        this.currentSection.items.push(item)
      } else {
        this.currentSection.items.splice(index, 0, item)
      }
    }
  }

  handleSectionSave() {}

  handleSectionRemove() {
    if (this.currentSection) {
      this.menuList.remove(this.currentSection)
      this.value = 'core'
    }
  }

  created() {
    if (this.$route.query.mock == '1') {
      this.info = baikeInfo
      this.menuList.push(...baikeSections)
    }
  }
}
</script>

<style lang="scss">
#baike-editor {
  color: $color-text-primary;

  .mz-aside {
    z-index: 150;
    background-color: $white;
  }
}

@include theme-root(dark) {
  #baike-editor .mz-aside {
    background-color: $primary;
  }
}
</style>
