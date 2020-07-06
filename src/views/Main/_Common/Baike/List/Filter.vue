<template>
  <mz-card class="acg-baike-filter"
    :elevation="0">
    <mz-heading class="acg-baike-filter__title"
      :level="7">筛选</mz-heading>
    <mz-state :value="state">
      <template #loading>正在加载中……</template>
      <template #error>加载失败</template>
      <template #empty>暂无筛选</template>
      <template #success>
        <mz-filter-section-group v-model="value"
          v-show="!loading">
          <mz-filter-section v-for="item of tagList"
            outlined
            label-position="right"
            :name="item._id"
            :key="item._id">
            <template #label>{{item.name}}</template>
            <mz-filter-section-item v-for="tag of item.tags"
              :key="tag._id"
              :value="tag._id">{{ tag.name }}</mz-filter-section-item>
          </mz-filter-section>
        </mz-filter-section-group>
      </template>
    </mz-state>
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'

@Component
export default class AcgBaikeFilter extends AcgVue {
  value = {}
  tagList: Record<string, any>[] = []
  loading = false
  error = false

  get state() {
    if (this.loading) return 'loading'
    if (this.error) return 'error'
    if (!this.tagList.length) return 'empty'
    return 'success'
  }

  async fetchTags() {
    this.tagList = []
    this.loading = true
    try {
      const tagList = await this.$get('tag-group', {
        params: { acgType: this.acgType, type: this.subType }
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
  @Watch('subType')
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
  height: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 16px 26px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: width 0.15s linear;
  will-change: width;
  &__title {
    line-height: 1.5em;
    padding-bottom: 12px;
  }

  .mz-filter-section__label {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
