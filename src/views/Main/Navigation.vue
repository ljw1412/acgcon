<template>
  <div class="main-navigation position-relative">
    <mz-fixed-section sticky
      placeholder>
      <div class="main-navigation-content">
        <mz-tabs v-model="value"
          active-bar-mode="fill">
          <mz-tab v-for="tab of tabList"
            :key="tab.label"
            :label="tab.label"
            :value="tab.type"
            @click="handleTabClick(tab)"></mz-tab>
        </mz-tabs>
      </div>
    </mz-fixed-section>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import { getNavByAcgType } from '@/helpers/navigation'

@Component
export default class MainNavigation extends AcgVue {
  value = ''

  get tabList() {
    return getNavByAcgType(this.acgType as Acgcon.Types)
  }

  handleTabClick(tab: Acgcon.NavigationItem) {
    if (this.value === tab.type) return
    tab.to && this.$router.push(tab.to)
  }

  init() {
    if (this.$route.name === 'SubHome') {
      this.value = 'home'
    } else if (this.$route.name === 'Baike') {
      this.value = `baike_${this.subType}`
    } else if (this.$route.name === 'Information') {
      this.value = 'information'
    }
  }

  created() {
    this.init()
  }
}
</script>

<style lang="scss">
.main-navigation {
  margin-top: -40px;
  z-index: 1;

  .main-navigation-content {
    max-width: $screen-width-lg;
    margin: 0 auto;
  }

  .mz-tabs__nav {
    line-height: 40px;
    height: 40px;
  }

  .mz-tab {
    padding: 0 20px;
    font-size: 14px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    &:not(.mz-tab--active) {
      color: #fff;
    }
  }

  .mz-fixed-section.is-sticky {
    background-color: $card-bg;
    box-shadow: 0 4px 6px $border-color;
    .mz-tab:not(.mz-tab--active) {
      color: $color-text-primary;
    }
  }
}
</style>
