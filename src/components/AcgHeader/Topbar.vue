<template>
  <div class="acg-topbar">
    <div class="acg-topbar__content flex-center-space-between">
      <nav-link></nav-link>
      <nav-search></nav-search>
      <nav-user-center></nav-user-center>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavLink from './NavLink.vue'
import NavSearch from './NavSearch.vue'
import NavUserCenter from './NavUserCenter.vue'

@Component({
  components: { NavLink, NavSearch, NavUserCenter }
})
export default class AcgTopbar extends Vue {}
</script>

<style lang="scss">
.acg-topbar {
  position: absolute;
  width: 100%;
  height: 60px;
  z-index: 1;
  padding: 12px 15px;

  &__content {
    line-height: 36px;
  }
}
</style>