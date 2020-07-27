<template>
  <div class="acg-topbar position-absolute w-100 px-15 py-12">
    <div class="acg-topbar__content d-flex align-items-center justify-content-between">
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
  height: 60px;

  &__content {
    line-height: 36px;
  }
}
</style>