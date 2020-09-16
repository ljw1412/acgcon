<template>
  <acg-base-layout class="acg-admin-filter">
    <filter-query slot="action"
      @query="handleQuery"></filter-query>
    <tag-group v-model="tagGroupList"></tag-group>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterQuery from './Query.vue'
import TagGroup from './TagGroup.vue'
import { fetchTagGroupList } from '@/services/tag'

@Component({ components: { FilterQuery, TagGroup } })
export default class AcgAdminFilter extends Vue {
  acgType = ''
  subType = ''
  tagGroupList = []

  async handleQuery(acgType: string, subType: string) {
    this.acgType = acgType
    this.subType = subType
    console.log(acgType, subType)
    this.tagGroupList = await fetchTagGroupList(acgType, subType)
  }
}
</script>

<style lang="scss">
</style>
