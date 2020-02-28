<template>
  <div class="acg-topbar">
    <div class="acg-topbar__content flex-center-space-between">
      <nav-link :links="links"></nav-link>
      <nav-user-center></nav-user-center>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import NavLink from './NavLink.vue'
import NavUserCenter from './NavUserCenter.vue'

@Component({
  components: { NavLink, NavUserCenter }
})
export default class AcgTopbar extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly links!: Record<string, any>[]
}
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