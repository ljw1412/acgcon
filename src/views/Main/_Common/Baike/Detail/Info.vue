<template>
  <acg-title-card class="acg-baike-info">
    <div class="acg-baike-info-cover">
      <mz-image fit="cover"
        :src="info.cover"></mz-image>
    </div>
    <div class="acg-baike-info-desc">{{info.desc}}</div>
  </acg-title-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBaikeInfo extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData
}
</script>
