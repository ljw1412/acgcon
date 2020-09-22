<template>
  <div class="acg-main">
    <acg-header :banner="config.banner"></acg-header>
    <router-view :name="currentRouteName"></router-view>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import { fetchBaseConfig } from '../../services/common'

@Component
export default class AcgMain extends AcgVue {
  config = {}

  get currentRouteName() {
    return this.$route.name === 'SubHome' ? this.acgType : 'default'
  }

  async fetchConfig() {
    try {
      this.config = await fetchBaseConfig()
    } catch (error) {
      console.error('[Main]', '获取基础配置失败')
    }
  }

  created() {
    this.fetchConfig()
  }
}
</script>

<style lang="scss">
</style>
