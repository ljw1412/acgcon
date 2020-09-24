<template>
  <div class="acg-information">
    <mz-loading background="transparent"
      :loading="loading">
      <mz-row :gutter="20"
        tag="transition-group"
        name="mz-zoom"
        class="information-list"
        style="min-height:500px;">
        <mz-col v-for="item of list"
          tag="a"
          target="_blank"
          class="information-item"
          style="margin-bottom: 20px;"
          :md="12"
          :xs="24"
          :href="item.url"
          :key="item._id">
          <info-card :item="item"></info-card>
        </mz-col>
      </mz-row>

      <mz-pagination v-model="pageIndex"
        :layout="['total', '|', 'prev', 'pager', 'next']"
        :pageSize.sync="pageSize"
        :total="count"></mz-pagination>
    </mz-loading>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import InfoCard from './InfoCard.vue'
import { fetchInformationList } from '@/services/information'
import AcgVue from '@/mixins/AcgVue'

@Component({ components: { InfoCard } })
export default class AcgInformation extends AcgVue {
  pageIndex = -1
  pageSize = 24
  count = 0
  list = []
  error = false
  loading = false

  async fetchInformationList() {
    this.error = false
    this.loading = true
    try {
      const { list, count } = await fetchInformationList({
        acgType: this.acgType,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      list.forEach((item: any) => {
        if (item.time) item.time = moment(item.time).format('YYYY-MM-DD HH:mm')
      })
      this.list = list
      this.count = count
    } catch (error) {
      this.error = true
    } finally {
      this.loading = false
    }
  }

  @Watch('pageIndex')
  async onIndexChange(val: number, oldVal?: number) {
    if (oldVal !== -1) {
      this.list = []
      await this.$nextTick()
      this.$router.replace({ query: { p: this.pageIndex + '' } })
      window.scrollTo({ top: 258, behavior: 'smooth' })
    }
    this.fetchInformationList()
  }

  created() {
    const p = this.$route.query.p as string
    this.pageIndex = p ? parseInt(p) : 1
  }
}
</script>

<style lang="scss">
.acg-information {
  margin-bottom: 20px;
  overflow: hidden;

  .information-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
