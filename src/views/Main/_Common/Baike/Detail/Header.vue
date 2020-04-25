<template>
  <div class="acg-baike-header">
    <mz-image class="acg-baike-header-bg"
      background
      width="110%"
      height="110%"
      fit="cover"
      :src="info.cover"></mz-image>
    <div class="acg-baike-header-content">
      <mz-heading class="acg-baike-header-title"
        :level="1">{{info.title}}</mz-heading>
      <div class="acg-baike-header-tags">
        <mz-tag v-for="tag of info.tags"
          size="medium"
          outlined
          :color="tag.color || '#ffffff'"
          :key="tag.name">{{tag.name}}</mz-tag>
      </div>
      <div class="acg-baike-header-author">{{info.author}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBaikeHeader extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData
}
</script>
