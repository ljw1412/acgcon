<template>
  <div class="nav-link">
    <ul class="nav-link-ul d-flex align-items-center">
      <router-link v-for="nav of links"
        :key="nav.label"
        :to="nav.to"
        #default="{href, navigate, isExactActive}">
        <li class="nav-link-item position-relative mr-12"
          :class="{'nav-link-item--active':isExactActive}">
          <a :href="href"
            @click="navigate"
            class="link d-flex text-white text-nowrap fs-14">{{nav.label}}</a>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class NavLink extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly links!: Record<string, any>[]
}
</script>

<style lang="scss">
.nav-link-ul > .nav-link-item {
  .link {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }
}
</style>