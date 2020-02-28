<template>
  <div class="nav-link">
    <ul class="nav-link-ul">
      <router-link v-for="nav of links"
        :key="nav.label"
        :to="nav.to"
        #default="{href, navigate, isExactActive}">
        <li class="nav-link-item"
          :class="{'nav-link-item--active':isExactActive}">
          <a :href="href"
            @click="navigate"
            class="link">{{nav.label}}</a>
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
.nav-link {
  .nav-link-ul {
    display: flex;
    align-items: center;
    .nav-link-item {
      margin-right: 12px;
      .link {
        font-size: 14px;
        color: #fff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        white-space: nowrap;
        display: flex;
        transition: color 0.5s;
      }
    }
  }
}
</style>