<template>
  <acg-title-card class="baike-editor-section">
    <template #title>
      <template v-if="isTitleEdit">
        <mz-input v-model="section.title"
          style="width: 200px;"
          placeholder="请输入板块标题"></mz-input>
        <mz-icon v-tooltip.bottom="'保存'"
          name="checkmark-circle-outline"
          class="mz-success--text"
          @click="isTitleEdit = false"></mz-icon>
        <mz-icon v-tooltip.bottom="'取消'"
          name="close-circle-outline"
          class="mz-danger--text"
          @click="isTitleEdit = false"></mz-icon>
      </template>
      <template v-else>
        <mz-icon name="pencil-outline"
          @click="isTitleEdit = true"></mz-icon>
        <span class="acg-title-card__title">{{section.title}}</span>
      </template>
    </template>

  </acg-title-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class AcgBaikeEditorSection extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly section!: Acgcon.BaikeSection

  isTitleEdit = false

  mounted() {
    this.isTitleEdit = !this.section.title
  }
}
</script>

<style lang="scss">
.baike-editor-section {
  margin-top: 20px;
}
</style>
