<template>
  <mz-fixed-section class="acg-sticky-filter"
    sticky
    placeholder
    :offset-top="60">
    <mz-filter-section v-model="selected[group.value]"
      v-for="group of tagList"
      :key="group._id"
      :label="group.name">
      <mz-filter-section-item v-for="tag of group.children"
        :key="tag.value"
        :value="tag.value">{{ tag.name }}</mz-filter-section-item>
    </mz-filter-section>
  </mz-fixed-section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class AcgStickyFiler extends Vue {
  @Prop(String)
  readonly acgType!: string
  @Prop(String)
  readonly baikeType!: string

  tagList: Record<string, any>[] = []
  selected = {}

  async fetchTags() {
    this.tagList = []
    const tagList = await this.$get('baike/tags', {
      params: { acgType: this.acgType, type: this.baikeType }
    })
    tagList.forEach((group: any) => {
      this.$set(
        this.selected,
        group.value,
        group.children.length ? group.children[0].value : null
      )
    })
    this.tagList = tagList
  }

  mounted() {
    this.fetchTags()
  }

  @Watch('acgType')
  @Watch('baikeType')
  onTypeChange() {
    this.selected = {}
    this.$nextTick(this.fetchTags)
  }

  @Watch('selected', { deep: true })
  onSelectedChange(selected: Record<string, any>) {
    this.$emit('change', { ...selected })
  }
}
</script>

<style lang="scss">
.acg-sticky-filter {
  .mz-filter-section-item {
    &__label {
      font-variant-numeric: tabular-nums;
      width: 45px;
      height: 26px;
      line-height: 26px;
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>
