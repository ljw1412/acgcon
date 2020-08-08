<template>
  <div class="baike-editor-core">
    <div class="d-flex">
      <cover-uploader :cover="info.cover"></cover-uploader>
      <div class="bg-card ml-20 w-100 p-20">
        <mz-material-input v-model="info.title"
          label="标题"
          show-word-count
          maxlength="50"
          hint="最多输入50个字符"></mz-material-input>
        <mz-material-input v-model="info.author"
          class="mt-20"
          label="作者/制作公司"
          show-word-count
          maxlength="20"
          hint="最多输入20个字符"></mz-material-input>
        <div class="mt-20 d-flex flex-wrap">
          <mz-tag v-for="tag of info.tags"
            :key="tag._id">{{tag.name}}</mz-tag>
          <mz-tag outlined
            v-ripple
            class="cursor-pointer"
            @click="isDisplayTagSelectModal=true">标签配置</mz-tag>
        </div>
      </div>
      <tag-select-modal v-model="isDisplayTagSelectModal"
        :acgType="$route.query.acgType"
        :subType="$route.query.subType"
        :defalutValue="info.tags"
        @save="handleTagSave"></tag-select-modal>
    </div>
    <div class="bg-card mt-20"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CoverUploader from './CoverUploader.vue'
import TagSelectModal from './TagSelectModal.vue'

@Component({ components: { CoverUploader, TagSelectModal } })
export default class AcgBaikeEditorCore extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData

  isDisplayTagSelectModal = false

  handleTagSave(tags: Acgcon.Tag[]) {
    this.info.tags = tags
  }
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

  .mz-tag {
    border-color: $color-text-secondary;
    color: $color-text-secondary;
  }
}

@include theme-root(dark) {
  .baike-editor-core {
    .mz-tag {
      color: $white;
      border-color: $white;
    }
  }
}
</style>
