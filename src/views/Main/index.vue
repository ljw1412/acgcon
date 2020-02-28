<template>
  <div class="acg-main">
    <acg-header :banner="config.banner"></acg-header>
    <div class="acg-main-content">
      <mz-fixed-section sticky
        placeholder>
        <acg-navigation></acg-navigation>
      </mz-fixed-section>
      <router-view :name="acgType"></router-view>
      <div style="height:1000px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgHeader from '@/components/AcgHeader/index.vue'
import AcgNavigation from '@/components/AcgNavigation.vue'

@Component({ components: { AcgHeader, AcgNavigation } })
export default class AcgHome extends Vue {
  config = {}

  get acgType() {
    return this.$route.params.acgType
  }

  async fetchConfig() {
    try {
      this.config = await this.$get('base/acg_base_config')
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
  z-index: 1;
  .mz-fixed-section.is-sticky {
    .acg-navigation {
      margin-top: 0;
      padding-top: 0;
      line-height: 60px;
      background-image: none;
      background-color: #ffffff;
      transition: background-color 0.15s;
      box-shadow: 0 -1px 2px rgba(#000, 0.3);
      .link {
        color: #333333;
      }
    }
  }
}
</style>