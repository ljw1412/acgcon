<template>
  <div class="acg-header-home-link">
    <router-link v-for="item of linkList"
      class="text-white mr-12 fs-14"
      :key="item.label"
      :to="item.to">{{item.label}}</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { pageHomeList } from '@/helpers/navigation'

@Component
export default class AcgHeaderHomeLink extends Vue {
  linkList = pageHomeList
}
</script>

<style lang="scss">
.acg-header-home-link {
  > a {
    @include clickable;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }
}
</style>
