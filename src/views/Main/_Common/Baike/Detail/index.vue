<template>
  <div class="acg-baike-detail">
    <baike-header :info="info"></baike-header>
    <baike-info :info="info"></baike-info>
    <mz-catalogue sidebar
      scroll-smooth
      width="200px"
      max-height="400px"
      :class="{'show':isDisplayCatalogue}" />
    <baike-basic :basic="info.basic"></baike-basic>
    <baike-section v-for="(section,index) of sections"
      :key="index"
      :title="section.title"
      :list="section.items" />
  </div>
</template>

<script lang="ts">
import './index.scss'
import { Component, Vue, Ref } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import AcgNavigation from '@/components/AcgNavigation/index.vue'
import BaikeHeader from './Header.vue'
import BaikeInfo from './Info.vue'
import BaikeBasic from './Basic.vue'
import BaikeSection from './Section'
import { baikeInfo, baikeSections } from '@/configs/mock'

@Component({
  components: {
    AcgNavigation,
    BaikeHeader,
    BaikeInfo,
    BaikeBasic,
    BaikeSection
  }
})
export default class AcgBaikeDetail extends AcgVue {
  @Ref('catalogue')
  readonly catalogueRef!: Vue

  isDisplayCatalogue = false

  info = baikeInfo
  sections = baikeSections

  onScroll(e: Event) {
    const top = document.documentElement.scrollTop || document.body.scrollTop
    this.isDisplayCatalogue = top >= 440
  }

  mounted() {
    window.addEventListener('scroll', this.onScroll, false)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll, false)
  }
}
</script>