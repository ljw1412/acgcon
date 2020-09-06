<template>
  <div class="baike-editor-section">
    <!-- 大纲 -->
    <editor-outline :section="section"
      :is-fold.sync="isFold"
      @active-change="handleSectionItemActive"></editor-outline>
    <!-- 模块内容 -->
    <div class="baike-editor-section-content">
      <editor-content-empty :empty="!items.length">
        <editor-type-dropdown-menu @action="handleInsertAction">
          <mz-button class="mt-10"
            color="primary">新增元素</mz-button>
        </editor-type-dropdown-menu>
      </editor-content-empty>

      <template v-for="(item,index) of items">
        <section-item :key="item._id || index"
          :item="item"
          :active="activedSectionItem === 'all' || item === activedSectionItem"
          @click.native="handleSectionItemClick(item)"></section-item>

        <editor-insert-line :key="`line-${item._id || index}`"
          :index="index + 1"
          @action="handleInsertAction"></editor-insert-line>
      </template>

    </div>
    <!-- 模块创建弹窗 -->
    <editor-create-section-modal v-model="isDisplayCreateModal"
      :section="currentSectionItem"></editor-create-section-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import EditorOutline from './Outline.vue'
import EditorInsertLine from './InsertLine.vue'
import EditorContentEmpty from './ContentEmpty.vue'
import EditorTypeDropdownMenu from './TypeDropdownMenu.vue'
import EditorCreateSectionModal from './CreateSectionModal/index.vue'
import SectionItem from './SectionItem.vue'

@Component({
  components: {
    EditorOutline,
    EditorInsertLine,
    EditorContentEmpty,
    EditorTypeDropdownMenu,
    EditorCreateSectionModal,
    SectionItem
  }
})
export default class BaikeEditorSection extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly section!: Acgcon.BaikeSection
  @Prop(Boolean)
  readonly isOutlineFold!: boolean

  isDisplayCreateModal = false
  currentSectionItem: Acgcon.BaikeSectionItem | {} = {}
  activedSectionItem: 'all' | Acgcon.BaikeSectionItem | null = null

  get isFold() {
    return this.isOutlineFold
  }

  set isFold(val: boolean) {
    this.$emit('update:isOutlineFold', val)
  }

  get items() {
    return this.section.items || []
  }

  handleInsertAction(type: string, item: any, index: number) {
    const sectionItem: Record<string, any> = { type, style: '' }
    if (type === 'left-right') {
      sectionItem.left = {}
      sectionItem.right = {}
    } else if (type === 'table') {
      sectionItem.data = []
    } else {
      sectionItem.data = ''
    }
    this.$emit('section-insert', sectionItem, index)
  }

  handleSectionItemClick(item: Acgcon.BaikeSectionItem) {
    this.currentSectionItem = item
    this.isDisplayCreateModal = true
    console.log(item)
  }

  handleSectionItemActive(data: any) {
    this.activedSectionItem = data
  }
}
</script>

<style lang="scss">
</style>
