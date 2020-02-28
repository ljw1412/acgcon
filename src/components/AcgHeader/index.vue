<template>
  <div class="acg-header">
    <topbar :links="navList"></topbar>
    <top-banner :bg-url="banner.bg"></top-banner>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Topbar from './Topbar.vue'
import TopBanner from './TopBanner.vue'
import TopLogo from './TopLogo.vue'
@Component({
  components: { Topbar, TopBanner, TopLogo }
})
export default class AcgHeader extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly banner!: Record<string, any>

  navList = [
    {
      label: 'ACG大本营',
      to: { name: 'home' }
    },
    {
      label: '动画',
      to: { name: 'subHome', params: { acgType: 'animation' } }
    },
    {
      label: '漫画',
      to: { name: 'subHome', params: { acgType: 'comic' } }
    },
    {
      label: '游戏',
      to: { name: 'subHome', params: { acgType: 'game' } }
    }
  ]
}
</script>

<style lang="scss">
.acg-header {
  position: relative;
  height: 320px;

  * {
    box-sizing: border-box;
  }
}
</style>