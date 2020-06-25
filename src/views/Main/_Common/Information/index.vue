<template>
  <div class="acg-information">

    <div style="min-height:500px;">
      <mz-masonry v-if="!loading"
        :gutter="10"
        :lineCount="3"
        mode="column-count">
        <mz-masonry-item v-for="item of list"
          :key="item._id">
          <a target="_blank"
            :href="item.url">
            <mz-card style="height:100%;">
              <div>
                <h3>{{item.title}}</h3>
                <p>{{item.desc}}</p>
              </div>
            </mz-card>
          </a>
        </mz-masonry-item>
      </mz-masonry>
    </div>

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
  index = -1
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

  created() {
    const p = this.$route.query.p as string
    this.index = p ? parseInt(p) : 1
  }

  @Watch('index')
  async onIndexChange(val: number, oldVal?: number) {
    if (oldVal !== -1) {
      this.list = []
      await this.$nextTick()
      this.$router.replace({ query: { p: this.index + '' } })
    }
    this.fetchInformationList()
  }
}
</script>

<style lang="scss">
.acg-information {
  margin-bottom: 20px;
}
</style>