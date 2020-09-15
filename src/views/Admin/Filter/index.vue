<template>
  <acg-base-layout class="acg-admin-filter">
    <filter-query slot="action"
      @query="handleQuery"></filter-query>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterQuery from './Query.vue'

@Component({ components: { FilterQuery } })
export default class AcgAdminFilter extends Vue {
  handleQuery(acgType: string, subType: string) {
    console.log(acgType, subType)
  }
}
</script>

<style lang="scss">
</style>
