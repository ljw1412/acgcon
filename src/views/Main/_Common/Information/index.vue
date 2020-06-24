<template>
  <div class="acg-information">

    <ul style="min-height:500px">
      <li v-for="item of list"
        :key="item._id">{{item.title}}</li>
    </ul>
    <mz-pagination v-model="index"
      :layout="['total', '|', 'prev', 'pager', 'next']"
      :pageSize.sync="size"
      :total="count"></mz-pagination>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'

@Component
export default class AcgInformation extends AcgVue {
  index = 1
  size = 20
  count = 0
  list = []
  error = false
  loading = false

  async fetchInformationList() {
    this.error = false
    this.loading = true
    try {
      const { list, count } = await this.$get('information', {
        params: { acgType: this.acgType, index: this.index, size: this.size }
      })
      this.list = list
      this.count = count
    } catch (error) {
      this.error = true
    } finally {
      this.loading = false
    }
  }

  @Watch('index', { immediate: true })
  async onIndexChange() {
    this.list = []
    await this.$nextTick()
    this.fetchInformationList()
  }
}
</script>

<style lang="scss">
</style>