<template>
  <div class="baike-editor-core">
    <div class="d-flex">
      <cover-uploader :cover="info.cover"></cover-uploader>
      <div class="bg-card ml-20 w-100"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CoverUploader from './CoverUploader.vue'

@Component({ components: { CoverUploader } })
export default class AcgBaikeEditorCore extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData
}
</script>

<style lang="scss">
.baike-editor-core {
  .cover-uploader {
    width: 195px;
    height: 260px;
    background-color: #eee;
    color: #999999;
  }
}
</style>
