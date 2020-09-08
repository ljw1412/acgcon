<template>
  <div class="baike-editor-base-info d-flex mb-20">
    <cover-uploader :cover="info.cover"></cover-uploader>
    <div class="w-100 ml-20">
      <div class="bg-card w-100 p-20">
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
      </div>

      <div v-tooltip.arrow.left="'标签配置'"
        class="tags bg-card w-100 mt-20 px-20 py-11 cursor-pointer"
        @click="isDisplayTagSelectModal=true">
        <div class="d-flex flex-wrap">
          <div v-if="info.tags && !info.tags.length"
            class="no-tag text-center w-100">
            <mz-icon name="pricetags-outline"></mz-icon>
            <span class="ml-6">选择Tags</span>
          </div>

          <mz-tag v-for="tag of info.tags"
            :key="tag._id">{{tag.name}}</mz-tag>
        </div>
      </div>
    </div>

    <tag-select-modal v-model="isDisplayTagSelectModal"
      :acgType="$route.query.acgType"
      :subType="$route.query.subType"
      :defalutValue="info.tags"
      @save="handleTagSave"></tag-select-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CoverUploader from './CoverUploader.vue'
import TagSelectModal from './TagSelectModal.vue'

@Component({ components: { CoverUploader, TagSelectModal } })
export default class BaikeEditorBaseInfo extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData

  isDisplayTagSelectModal = false

  handleTagSave(tags: Acgcon.Tag[]) {
    this.info.tags = tags
  }
}
</script>

<style lang="scss">
.baike-editor-base-info {
  .tags {
    height: 48px;
    line-height: 48px;
    box-sizing: border-box;
  }

  .no-tag {
    line-height: 26px;
  }

  .mz-tag {
    color: $color-text-secondary;
    margin-right: 6px;
    &:last-child {
      margin-right: 0;
    }
  }
}

@include theme-root(dark) {
  .baike-editor-base-info {
    .mz-tag {
      color: $white;
      border-color: $white;
    }
  }
}
</style>
