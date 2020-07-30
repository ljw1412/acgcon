<template>
  <mz-layout v-cover
    class="acg-admin h-100 overflow-hidden">
    <mz-aside class="acg-admin-aside">
      <div class="acg-admin-logo user-select-none text-center fs-24">ACG控后台管理</div>
      <mz-navigation :data="navigations"></mz-navigation>
    </mz-aside>

    <mz-layout>
      <mz-header>
        <div class="acg-admin-header h-100 px-10 d-flex align-items-center justify-content-between">
          <div>
            <span v-text="title"
              class="ml-8 fs-18 text-gray-900"></span>
          </div>
          <div class="acg-admin-header-right d-flex align-items-center justify-content-between">
            <mz-icon v-tooltip="'返回主站'"
              class="home-icon cursor-pointer"
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

      <mz-main class="p-16 overflow-auto">
        <router-view></router-view>
      </mz-main>
    </mz-layout>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'
import navigations from './navigations'
import { State } from 'vuex-class'

@Component({ components: { AcgUserAvatar } })
export default class AcgAdmin extends Vue {
  @State readonly title!: string

  navigations = navigations
}
</script>

<style lang="scss">
@import '@admin/var.scss';
.acg-admin {
  .mz-header,
  .mz-aside {
    position: relative;
    background-color: $white;
    box-shadow: 0 0 5px $border-color;
  }

  .mz-aside {
    z-index: 100;

    .acg-admin-logo {
      height: $topbar-height;
      line-height: $topbar-height;
      color: $color-text-primary;
    }
  }

  .home-icon {
    color: $color-text-primary;
  }
}

:root[data-theme='dark'] {
  .acg-admin {
    .mz-header,
    .mz-aside {
      background-color: $primary;
    }
  }
}
</style>
