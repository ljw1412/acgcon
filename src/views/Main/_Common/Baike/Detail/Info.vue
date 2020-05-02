<template>
  <acg-title-card class="acg-baike-info">
    <div class="acg-baike-info-cover">
      <mz-image fit="cover"
        :src="info.cover"></mz-image>
    </div>
    <baike-section-item class="acg-baike-info-desc"
      style="text-indent: 2em;">{{info.desc}}</baike-section-item>
  </acg-title-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BaikeSectionItem from './SectionItem'

@Component({ components: { BaikeSectionItem } })
export default class AcgBaikeInfo extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData
}
</script>
