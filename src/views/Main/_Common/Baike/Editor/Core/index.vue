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
            color="var(--color-text-secondary)"
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
      <mz-row style="margin-bottom: 10px;">
        <mz-col v-for="(info,index) of info.basic"
          :key="index"
          :sm="12"
          :md="8">
          <span>{{info.name}}</span>
          <span>:</span>
          <span>{{info.value}}</span>
        </mz-col>
      </mz-row>
      <mz-input-group>
        <mz-input v-model="basicText"
          shadow
          placeholder="格式为 属性名称:属性值，多条以”;“分隔。"
          @keydown.native.enter="addInfoBasic"></mz-input>
        <mz-button color="primary"
          shadow
          @click="addInfoBasic">添加</mz-button>
      </mz-input-group>
    </div>

    <tag-select-modal v-model="isDisplayTagSelectModal"
      :acgType="$route.query.acgType"
      :subType="$route.query.subType"
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
  basicText = ''

  addInfoBasic() {
    if (this.basicText.trim()) {
      const list = this.basicText.split(';')
      list.forEach(item => {
        const [name = '', value = ''] = item.split(':')
        if (name) {
          this.info.basic!.push({ name: name.trim(), value: value.trim() })
        }
      })
      this.basicText = ''
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
