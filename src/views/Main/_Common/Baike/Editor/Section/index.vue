<template>
  <div class="baike-editor-section">
    <editor-outline :section="section"></editor-outline>
    <div class="baike-editor-section-content">
      <section-item v-for="(item,index) of items"
        :key="index"
        v-bind="item"
        @click="handleSectionItemClick(item)"></section-item>
    </div>
    <editor-actions @insert="handleInsert"></editor-actions>
    <editor-create-section-modal v-model="isDisplayCreateModal"
      :type="currentType"
      :is-edit="isEdit"
      @save="handleSectionSave"></editor-create-section-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import EditorActions from './Actions.vue'
import EditorOutline from './Outline.vue'
import EditorCreateSectionModal from './CreateSectionModal/index.vue'
import SectionItem from '../../Detail/SectionItem'
import { MenuItem } from '../helper'

@Component({
  components: {
    EditorOutline,
    EditorActions,
    EditorCreateSectionModal,
    SectionItem
  }
})
export default class BaikeEditorSection extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly section!: MenuItem

  isDisplayCreateModal = false
  isEdit = false
  currentType = ''

  get items() {
    return this.section.items || []
  }

  handleInsert(type: string) {
    this.currentType = type
    this.isEdit = false
    this.isDisplayCreateModal = true
  }

  handleSectionItemClick(item: Acgcon.BaikeSectionItem) {
    this.currentType = item.type
    this.isEdit = true
    // TODO 去修改
  }

  handleSectionSave(data: Acgcon.BaikeSectionItem) {
    this.$emit('section-save', data)
  }
}
</script>

<style lang="scss">
.baike-editor-section {
  padding-right: 160px;
}

.baike-editor-section-content {
  > * {
    margin-bottom: 5px;
    padding: 5px;
  }

  > .acg-baike-text {
    position: relative;
    &:hover {
      @include foreground;
    }
  }
}
</style>
