<template>
  <div class="baike-editor-core">
    <base-info :info="info"></base-info>
    <description v-model="info.desc"></description>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CoverUploader from './CoverUploader.vue'
import TagSelectModal from './TagSelectModal.vue'
import BaseInfo from './BaseInfo.vue'
import Description from './Description.vue'

@Component({
  components: { CoverUploader, TagSelectModal, BaseInfo, Description }
})
export default class BaikeEditorCore extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData

  isDisplayTagSelectModal = false

  handleTagSave(tags: Acgcon.Tag[]) {
    this.info.tags = tags
  }
}
</script>

<style lang="scss">
</style>
