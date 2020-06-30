<template>
  <div class="acg-main">
    <acg-header :banner="config.banner"></acg-header>
    <div class="acg-main-content">
      <!-- 导航栏 -->
      <acg-navigation fixable
        offsetTop="-60px"></acg-navigation>
      <div class="acg-main-core acg-media-container"
        :data-name="currentRouterName">
        <router-view :name="currentRouterName"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgHeader from '@/components/AcgHeader/index.vue'
import AcgNavigation from '@/components/AcgNavigation/index.vue'

@Component({ components: { AcgHeader, AcgNavigation } })
export default class AcgHome extends Vue {
  config = {}

  get acgType() {
    return this.$route.params.acgType
  }

  get currentRouterName() {
    if (this.$route.name === 'subHome') return this.acgType
    return 'default'
  }

  async fetchConfig() {
    try {
      this.config = await this.$get('basic/acg_base_config')
    } catch (error) {
      console.error('[ACGMain]', '获取基础配置失败')
    }
  }

  created() {
    this.fetchConfig()
  }
}
</script>

<style lang="scss">
.acg-main-content {
  position: relative;
  z-index: 10;
}

.acg-main-core {
  padding-top: 20px;
}
</style>