<template>
  <mz-card class="baike-editor-core">
    <div class="basic-data">
      <div class="cover-uploader">
        <acg-image v-if="info.cover"
          :src="info.cover"></acg-image>
        <div v-else
          style="text-align: center;">
          <mz-icon name="image-sharp"
            size="40"></mz-icon>
          <div style="font-size: 12px;">封面上传</div>
        </div>
      </div>
      <div class="basic-option">
        <mz-material-input v-model="info.title"
          label="标题"
          show-word-count
          maxlength="50"
          hint="最多输入50个字符"></mz-material-input>
        <mz-material-input v-model="info.author"
          label="作者/制作公司"
          show-word-count
          maxlength="20"
          hint="最多输入20个字符"></mz-material-input>
        <div>
          <h3>标签</h3>
          <mz-tag v-for="tag of info.tags"
            :key="tag._id">{{tag.name}}</mz-tag>
          <mz-tag outlined
            v-ripple
            color="var(--color-text-primary)"
            class="is-pointer"
            @click="isDisplayTagSelectModal=true">标签配置</mz-tag>
        </div>
      </div>
    </div>
    <div class="basic-desc">
      <h3>简介</h3>
      <mz-textarea v-model="info.desc"
        placeholder="请输入描述"></mz-textarea>
    </div>
    <div class="basic-info">
      <h3>基本信息</h3>
      <ul>
        <li v-for="(info,index) of info.basic"
          :key="index">
          <span>{{info.name}}</span>:
          <span>{{info.value}}</span>
        </li>
        <li>
          <mz-input-group>
            <mz-input v-model="basicItem.name"
              shadow
              style="width: 20%"
              placeholder="属性名称"></mz-input>
            <mz-input v-model="basicItem.value"
              shadow
              placeholder="属性值"></mz-input>
            <mz-button color="primary"
              shadow
              @click="addInfoBasic">新增</mz-button>
          </mz-input-group>
        </li>
      </ul>
    </div>

    <tag-select-modal v-model="isDisplayTagSelectModal"
      acgType="animation"
      subType="animation"
      :defalutValue="info.tags"
      @save="handleTagSave"></tag-select-modal>
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TagSelectModal from './TagSelectModal.vue'

@Component({ components: { TagSelectModal } })
export default class AcgBaikeEditorBasic extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData

  isDisplayTagSelectModal = false
  infoList: Record<string, any>[] = []
  basicItem = { name: '', value: '' }

  addInfoBasic() {
    const { name, value } = this.basicItem
    if (name.trim() && value.trim()) {
      if (!this.info.basic) this.$set(this.info, 'basic', [])
      this.info.basic!.push({ name, value })
    }
  }

  handleTagSave(tags: Acgcon.Tag[]) {
    this.info.tags = tags
  }
}
</script>

<style lang="scss">
.baike-editor-core {
  padding: 20px;

  .basic-data {
    display: flex;
    .cover-uploader {
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 195px;
      height: 260px;
      margin-right: 20px;
      background-color: #eee;
      color: $color-text-secondary;
    }

    .basic-option {
      width: 0;
      flex: 1 0 auto;
      > * + * {
        margin-top: 10px;
      }
      .mz-tag {
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
  }

  .basic-desc,
  .basic-info {
    margin-top: 20px;
    h3 {
      margin-bottom: 10px;
    }
  }
}
</style>
