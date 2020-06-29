<template>
  <div class="acg-information">
    <mz-loading background="transparent"
      :loading="loading">
      <mz-row :gutter="20"
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
          <mz-card style="height:100%;"
            outlined
            radius="4px">
            <div class="information-cover">
              <acg-image :src="item.cover"
                fit="cover">
              </acg-image>
            </div>
            <div class="information-core">
              <h3>{{item.title}}</h3>
              <p class="information-info">
                <span>来源：{{item.from}}</span>
                <span>时间：{{item.time}}</span>
              </p>
              <p class="information-desc">{{item.desc}}</p>
            </div>
          </mz-card>
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import { fromMap } from '@/configs/constants'

@Component
export default class AcgInformation extends AcgVue {
  pageIndex = -1
  pageSize = 24
  count = 0
  list = []
  error = false
  loading = false

  formatFromName(name: string) {
    return fromMap[name] || name
  }

  async fetchInformationList() {
    this.error = false
    this.loading = true
    try {
      const { list, count } = await this.$get('information', {
        params: {
          acgType: this.acgType,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      list.forEach((item: any) => {
        if (item.time) item.time = moment(item.time).format('YYYY-MM-DD HH:mm')
        item.from = this.formatFromName(item.from)
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
    this.pageIndex = p ? parseInt(p) : 1
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
}
</script>

<style lang="scss">
.acg-information {
  margin-bottom: 20px;
  overflow: hidden;
  padding-top: 6px;

  .information-list {
    display: flex;
    flex-wrap: wrap;
    .mz-card {
      position: relative;
      display: flex;
      border-radius: 4px;
      transition: all 0.2s;
      overflow: hidden;
      &:hover {
        transform: translateY(-5px);
        @include elevation(10);
      }
      &:active {
        opacity: 0.6;
      }
    }
  }

  .information-cover {
    flex: 1 0 auto;
    width: 30%;
    height: 100%;
  }

  .information-core {
    width: 70%;
    padding: 16px;
  }

  .information-info {
    margin-top: 8px;
    font-size: 12px;
    line-height: 14px;
    > span + span {
      margin-left: 10px;
    }
  }

  .information-desc {
    $line-height: 20px;
    $line: 3;
    @include multi-ellipsis($line);
    height: $line * $line-height;
    line-height: $line-height;
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>