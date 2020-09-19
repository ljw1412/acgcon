<template>
  <acg-base-layout class="acg-admin-filter">
    <filter-query slot="action"
      @query="handleQuery"
      @action="handleAction"></filter-query>
    <tag-group v-model="tagGroupList"></tag-group>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterQuery from './Query.vue'
import TagGroup from './TagGroup.vue'
import { fetchTagGroupList, updateTagGroupOrder } from '@/services/tag'
import { namespace } from 'vuex-class'

@Component({ components: { FilterQuery, TagGroup } })
export default class AcgAdminFilter extends Vue {
  @(namespace('admin').Mutation)
  readonly setGroupOrderState!: Function

  acgType = ''
  subType = ''
  tagGroupList: Record<string, any>[] = []
  tagGroupListBak: Record<string, any>[] = []

  async handleQuery(acgType: string, subType: string) {
    this.acgType = acgType
    this.subType = subType
    console.log(acgType, subType)
    this.tagGroupList = await fetchTagGroupList(acgType, subType)
  }

  async handleAction(action: string, data: any) {
    if (action === 'sort') {
      if (data) {
        this.tagGroupListBak = [...this.tagGroupList]
        this.setGroupOrderState(true)
      } else {
        this.tagGroupList = await updateTagGroupOrder({
          acgType: this.acgType,
          subType: this.subType,
          list: this.tagGroupList.map(item => item._id)
        })
        this.setGroupOrderState(false)
      }
    } else if (action === 'sort-cancel') {
      this.tagGroupList = this.tagGroupListBak
      this.setGroupOrderState(false)
    }
  }
}
</script>

<style lang="scss">
</style>
