<template>
  <div class="baike-editor-section"
    :class="{'is-fold':isOutlineFold}">
    <!-- 大纲 -->
    <editor-outline :section="section"
      :is-fold.sync="isOutlineFold"
      @active-change="handleSectionItemActive"></editor-outline>
    <!-- 模块内容 -->
    <div class="baike-editor-section-content">
      <editor-content-empty :empty="!items.length">
        <editor-type-dropdown-menu @action="handleInsertAction">
          <mz-button class="mt-10"
            color="primary">新增元素</mz-button>
        </editor-type-dropdown-menu>
      </editor-content-empty>

      <section-item v-for="(item,index) of items"
        :key="index"
        :item="item"
        :active="activedSectionItem === 'all' || item === activedSectionItem"
        @click="handleSectionItemClick(item)"></section-item>
    </div>
    <!-- 模块操作栏 -->
    <editor-actions @insert="handleInsert"></editor-actions>
    <!-- 模块创建弹窗 -->
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
import EditorContentEmpty from './ContentEmpty.vue'
import EditorTypeDropdownMenu from './TypeDropdownMenu.vue'
import EditorCreateSectionModal from './CreateSectionModal/index.vue'
import SectionItem from './SectionItem.vue'

@Component({
  components: {
    EditorOutline,
    EditorActions,
    EditorContentEmpty,
    EditorTypeDropdownMenu,
    EditorCreateSectionModal,
    SectionItem
  }
})
export default class BaikeEditorSection extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly section!: Acgcon.BaikeSection

  isDisplayCreateModal = false
  isEdit = false
  isOutlineFold = false
  currentType = ''
  activedSectionItem: 'all' | Acgcon.BaikeSectionItem | null = null

  get items() {
    return this.section.items || []
  }

  handleInsert(type: string) {
    this.currentType = type
    this.isEdit = false
    this.isDisplayCreateModal = true
  }

  handleInsertAction(type: string, item: any) {
    const sectionItem: Record<string, any> = { type, style: '' }
    if (type === 'left-right') {
      sectionItem.left = {}
      sectionItem.right = {}
    } else if (type === 'table') {
      sectionItem.data = []
    } else {
      sectionItem.data = ''
    }
    this.$emit('section-save', sectionItem)
  }

  handleSectionItemClick(item: Acgcon.BaikeSectionItem) {
    this.currentType = item.type
    this.isEdit = true
    // TODO 去修改
  }

  handleSectionSave(data: Acgcon.BaikeSectionItem) {
    this.$emit('section-save', data)
  }

  handleSectionItemActive(data: any) {
    this.activedSectionItem = data
  }
}
</script>

<style lang="scss">
.baike-editor-section {
  padding-left: 220px;
  &.is-fold {
    padding-left: 0;
  }
}
</style>
