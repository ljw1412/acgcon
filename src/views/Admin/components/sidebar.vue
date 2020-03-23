<template>
  <div class="admin-sidebar">
    <mz-navigation :data="navigations"></mz-navigation>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AdminSidebar extends Vue {
  navigations = [
    { label: '筛选项管理', icon: 'md-pricetags', to: { name: 'adminFilter' } }
  ]
}
</script>

<style lang="scss">
@import '@admin/var.scss';
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: $sidebar-width;
  height: 100%;
  padding-top: $topbar-height;
  z-index: 400;
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.12);
  background-color: #fff;
}
</style>
