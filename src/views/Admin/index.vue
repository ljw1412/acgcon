<template>
  <mz-layout class="acg-admin">
    <mz-aside class="acg-admin-aside">
      <div class="acg-admin-logo">ACG控后台管理</div>
      <mz-navigation :data="navigations"></mz-navigation>
    </mz-aside>

    <mz-layout>
      <mz-header>
        <div class="acg-admin-header">
          <div></div>
          <div class="acg-admin-header-left">
            <mz-icon v-tooltip="'返回主站'"
              class="is-pointer"
              name="home-outline"
              size="22"
              style="margin-right:20px;"
              @click="$router.push({ name: 'home' })"></mz-icon>
            <acg-user-avatar inner-info
              in-back-stage
              :size="44" />
          </div>
        </div>
      </mz-header>

      <mz-main>
        <router-view></router-view>
      </mz-main>
    </mz-layout>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'

@Component({ components: { AcgUserAvatar } })
export default class AcgAdmin extends Vue {
  navigations = [
    {
      title: '筛选项管理',
      icon: 'pricetags-outline',
      to: { name: 'adminFilter' }
    },
    {
      title: '缓存管理',
      icon: 'file-tray-stacked-outline',
      to: { name: 'adminCache' }
    },
    {
      title: '爬虫管理',
      icon: 'bug-outline',
      to: { name: 'adminCrawler' }
    }
  ]

  beforeCreate() {
    document.documentElement.dataset.fullscreen = ''
  }

  destroyed() {
    delete document.documentElement.dataset.fullscreen
  }
}
</script>

<style lang="scss">
@import '@admin/var.scss';
.acg-admin {
  height: 100%;
  overflow: hidden;

  .mz-header,
  .mz-aside {
    position: relative;
    background-color: $color-white;
    box-shadow: 0 0 5px $color-border-base;
  }

  .mz-aside {
    z-index: 100;

    .acg-admin-logo {
      user-select: none;
      height: $topbar-height;
      font-size: 24px;
      line-height: $topbar-height;
      text-align: center;
      color: $color-text-primary;
    }
  }

  .mz-main {
    padding: 16px;
    overflow: auto;
  }
}

.acg-admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 10px;
}

.acg-admin-header-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:root[data-theme='dark'] {
  .acg-admin {
    .mz-header,
    .mz-aside {
      background-color: $color-primary;
    }
  }
}
</style>
