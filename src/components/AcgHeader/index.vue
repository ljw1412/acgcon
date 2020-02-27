<template>
  <div class="acg-header">
    <topbar></topbar>
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