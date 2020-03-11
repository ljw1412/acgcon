<template>
  <div class="acg-admin">
    <topbar></topbar>
    <sidebar></sidebar>
    <div class="acg-admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import topbar from './components/topbar.vue'
import sidebar from './components/sidebar.vue'

@Component({ components: { topbar, sidebar } })
export default class AcgAdmin extends Vue {}
</script>

<style lang="scss">
@import '@admin/var.scss';
.acg-admin-content {
  padding: ($topbar-height + 10px) 10px 10px ($sidebar-width + 10px);
}
</style>
