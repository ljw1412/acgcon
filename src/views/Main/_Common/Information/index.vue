<template>
  <div class="acg-information">
    <mz-loading v-show="loading"></mz-loading>
    <mz-row :gutter="20"
      class="information-list"
      style="min-height:500px;">
      <mz-col v-for="item of list"
        tag="a"
        target="_blank"
        style="margin-bottom: 20px;"
        :md="12"
        :xs="24"
        :href="item.url"
        :key="item._id">
        <mz-card style="height:100%;"
          outlined
          radius="4px">
          <div class="information-cover">
            <mz-image :src="item.cover"
              width="100%"
              height="100%"
              fit="cover">
              <template #error>
                <div class="information-cover-error">图片加载失败</div>
              </template>
            </mz-image>
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

    <mz-pagination v-model="index"
      :layout="['total', '|', 'prev', 'pager', 'next']"
      :pageSize.sync="size"
      :total="count"></mz-pagination>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'

const fromMap: Record<string, any> = {
  dmzj: '动漫之家'
}

@Component
export default class AcgInformation extends AcgVue {
  index = -1
  size = 24
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
        params: { acgType: this.acgType, index: this.index, size: this.size }
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
        border-width: 0;
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

  .information-cover-error {
    width: 100%;
    height: 100%;
    background: #eee;
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
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
    @include multi-ellipsis(4);
    height: 80px;
    line-height: 20px;
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>