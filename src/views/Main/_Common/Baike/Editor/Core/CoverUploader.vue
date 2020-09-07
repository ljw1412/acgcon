<template>
  <div class="bg-card p-10">
    <div class="cover-uploader cursor-pointer flex-shrink-0 d-flex justify-content-center align-items-center">
      <acg-image v-if="cover"
        :src="cover"></acg-image>
      <div v-else
        style="text-align: center;">
        <mz-icon name="image-sharp"
          size="40"></mz-icon>
        <div style="font-size: 12px;">封面上传</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaikeEditorCoverUploader extends Vue {
  @Prop(String)
  readonly cover!: string
}
</script>

<style lang="scss">
</style>
