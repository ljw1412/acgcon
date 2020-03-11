<template>
  <div class="admin-topbar">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AdminTopbar extends Vue {}
</script>

<style lang="scss">
@import '@admin/var.scss';
.admin-topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $topbar-height;
  z-index: 500;
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.12);
  background-color: #fff;
}
</style>
