<template>
  <div class="acg-header position-relative"
    :style="{'background-image':`url(${banner.bg})`}">
    <acg-between-layout class="px-15 py-12">
      <home-link slot="left"></home-link>
      <acg-user-avatar slot="right"
        inner-info></acg-user-avatar>
    </acg-between-layout>

    <div class="d-flex flex-column justify-content-center align-items-center">
      <logo></logo>
      <search class="mt-20"></search>
    </div>
    <!-- 底部渐变 -->
    <div class="shade position-absolute w-100"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import HomeLink from './HomeLink.vue'
import Logo from './Logo.vue'
import Search from './Search.vue'

@Component({ components: { HomeLink, Logo, Search } })
export default class AcgHeader extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly banner!: Record<string, any>
}
</script>

<style lang="scss">
.acg-header {
  height: 320px;
  background-color: $black-background-color;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .shade {
    left: 0;
    bottom: 0;
    height: 140px;
    z-index: 1;
    background: linear-gradient(180deg, rgba(22, 22, 26, 0), #16161a 100%);
  }
}
</style>
