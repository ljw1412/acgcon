<template>
  <mz-layout v-cover
    class="acg-admin h-100">
    <mz-header>
      <admin-header></admin-header>
    </mz-header>
    <mz-layout>
      <mz-aside class="border-right">
        <admin-navigation></admin-navigation>
      </mz-aside>
      <mz-main class="p-16 overflow-auto">
        <router-view></router-view>
      </mz-main>
    </mz-layout>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AdminHeader from './Header.vue'
import AdminNavigation from './Navigation.vue'

@Component({ components: { AdminHeader, AdminNavigation } })
export default class AcgAdmin extends Vue {}
</script>

<style lang="scss">
.acg-admin {
  .mz-header {
    position: relative;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 $border-color;
    z-index: 1;
  }

  .mz-aside {
    background-color: #fff;
  }

  [class$='-query'] {
    > * + * {
      margin-left: 10px;
    }
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
