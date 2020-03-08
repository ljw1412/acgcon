<template>
  <div class="acg-baike-filter">
    <div class="acg-baike-filter__title">筛选</div>
    <div v-show="loading">正在加载中……</div>
    <div v-show="error">加载失败</div>
    <div v-show="!error && !loading && !tagList.length ">暂无筛选</div>
    <mz-filter-section-group v-model="value"
      v-show="!loading">
      <mz-filter-section v-for="item of tagList"
        outlined
        label-position="right"
        :name="item.value"
        :key="item._id">
        <template #label>{{item.name}}</template>
        <mz-filter-section-item v-for="tag of item.children"
          :key="tag.value"
          :value="tag.value">{{ tag.name }}</mz-filter-section-item>
      </mz-filter-section>
    </mz-filter-section-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class AcgBaikeFilter extends Vue {
  @Prop(String)
  readonly acgType!: string
  @Prop(String)
  readonly baikeType!: string

  value = {}
  tagList: Record<string, any>[] = []
  loading = false
  error = false

  async fetchTags() {
    this.tagList = []
    this.loading = true
    try {
      const tagList = await this.$get('baike/tags', {
        params: { acgType: this.acgType, type: this.baikeType }
      })
      tagList.forEach((group: any) => {
        this.$set(
          this.value,
          group.value,
          group.children.length ? group.children[0].value : null
        )
      })
      this.tagList = tagList
    } catch (error) {
      this.error = true
    } finally {
      this.loading = false
    }
  }

  mounted() {
    this.fetchTags()
  }

  @Watch('acgType')
  @Watch('baikeType')
  onTypeChange() {
    this.value = {}
    this.$nextTick(this.fetchTags)
  }

  @Watch('value', { deep: true })
  onValueChange(value: Record<string, any>) {
    this.$emit('change', { ...value })
  }
}
</script>

<style lang="scss">
@import '../var.scss';
.acg-baike-filter {
  width: $filter-width;
  min-height: 100px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 16px 26px;
  box-shadow: 1px 1px 5px rgba(#000, 0.1);
  transition: width 0.15s linear;
  &__title {
    height: 22px;
    line-height: 22px;
    font-size: 18px;
    padding-bottom: 12px;
  }

  .mz-filter-section__label {
    font-size: 14px;
    font-weight: bold;
  }

  .mz-filter-section-item {
    &__label {
      font-variant-numeric: tabular-nums;
      width: 44px;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
