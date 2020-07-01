<template>
  <div class="baike-editor-core">
    <div class="basic-data">
      <div class="cover-uploader">
        <acg-image v-if="info.cover"
          :src="info.cover"></acg-image>
        <div v-else
          style="text-align: center;">
          <mz-icon name="image-sharp"
            size="40"></mz-icon>
          <div>封面上传</div>
        </div>
      </div>
      <div class="basic-option">
        <mz-input v-model="info.title"
          placeholder="请输入标题"></mz-input>
        <mz-input v-model="info.author"
          placeholder="请输入作者/制作公司"></mz-input>
        <textarea v-model="info.desc"
          placeholder="请输入描述"></textarea>
        <div>标签</div>
      </div>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBaikeEditorBasic extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData

  infoList: Record<string, any>[] = []
  basicItem = { name: '', value: '' }

  addInfoBasic() {
    const { name, value } = this.basicItem
    if (name.trim() && value.trim()) {
      if (!this.info.basic) this.$set(this.info, 'basic', [])
      this.info.basic!.push({ name, value })
    }
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
      > * + * {
        margin-top: 10px;
      }
    }
  }

  .basic-info {
    margin-top: 20px;
    h3 {
      margin-bottom: 10px;
    }
  }
}
</style>
