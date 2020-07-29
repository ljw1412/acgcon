<template>
  <mz-modal v-model="mVisible"
    divider
    outer-scroll
    title="配置标签"
    width="600px"
    class="acg-baike-tag-select-modal"
    :close-on-click-mask="false"
    :content-style="{padding: 0}">
    <div class="tag-select-modal-container clearfix">
      <mz-list v-model="currentType"
        size="medium"
        class="container-left">
        <mz-list-item v-for="item of list"
          :key="item._id"
          :value="item._id"
          :title="item.name">
          <template #suffix>{{ groupCountMap[item._id] || 0 }}</template>
        </mz-list-item>
      </mz-list>

      <div class="container-right">
        <div class="tag-list">
          <mz-tag v-for="tag of tagList"
            :key="tag._id"
            :color="tag.checked?'#43A047':undefined"
            :text-color="tag.checked?'#ffffff':undefined"
            @click="handleTagClick(tag)">{{tag.name}}</mz-tag>
          <div v-if="!tagList.length">未配置标签</div>
        </div>
        <div v-if="tagList.length"
          class="tag-list-tips mz-danger--text">
          *{{currentGroup.name}}{{currentGroup.multiple?'允许多选':'仅允许单选'}}
        </div>
      </div>
    </div>
    <div class="tag-select-modal-result px-8">
      已选择:
      <mz-tag v-for="tag of selectTagList"
        size="medium"
        :key="tag._id">{{tag.name}}</mz-tag>
    </div>

    <template #footer>
      <mz-button @click="mVisible = false">取消</mz-button>
      <mz-button color="primary"
        @click="save">保存</mz-button>
    </template>
  </mz-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'

@Component
export default class AcgBaikeTagSelectModal extends Vue {
  @Model('visible:change', Boolean)
  readonly visible!: boolean
  @Prop(String)
  readonly acgType!: string
  @Prop(String)
  readonly subType!: string
  @Prop({ type: Array, default: () => [] })
  readonly defalutValue!: Acgcon.Tag[]

  currentType = ''
  list: Acgcon.TagGroup[] = []

  get baseParams() {
    return { acgType: this.acgType, type: this.subType }
  }

  get mVisible() {
    return this.visible
  }

  set mVisible(val: boolean) {
    this.$emit('visible:change', val)
  }

  get currentGroup(): Acgcon.TagGroup | Record<string, any> {
    return this.list.find(item => item._id === this.currentType) || {}
  }

  get groupCountMap() {
    const map: Record<string, any> = {}
    this.list.forEach(group => {
      map[group._id] = group.tags.filter(tag => tag.checked).length
    })
    return map
  }

  get tagList(): Acgcon.Tag[] {
    return this.currentGroup.tags || []
  }

  get selectTagList() {
    const list: Acgcon.Tag[] = []
    this.list.forEach(group => {
      list.push(...group.tags.filter((tag: Acgcon.Tag) => tag.checked))
    })
    return list
  }

  async listTagGroup() {
    const list = await this.$get('tag-group', { params: this.baseParams })
    const defalutTagIdList = this.defalutValue.map(tag => tag._id)
    list.forEach((group: Acgcon.TagGroup) => {
      group.tags.forEach(
        tag => (tag.checked = defalutTagIdList.includes(tag._id))
      )
      group.tags = group.tags.filter(tag => !tag.isAll)
    })
    this.currentType = list.length ? list[0]._id : ''
    this.list = list
  }

  handleTagClick(tag: Acgcon.Tag) {
    if (!this.currentGroup.multiple && !tag.checked) {
      this.tagList.forEach(tag => (tag.checked = false))
    }
    tag.checked = !tag.checked
  }

  @Watch('visible')
  handleVisibleChange(visible: boolean) {
    if (visible) {
      this.list = []
      this.listTagGroup()
    }
  }

  save() {
    this.$emit('save', this.selectTagList)
    this.mVisible = false
  }
}
</script>

<style lang="scss">
.tag-select-modal-container {
  height: 300px;
  .container-left {
    float: left;
    width: 30%;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid $border-color;
    overflow-y: auto;
    li {
      @include foreground;
      cursor: pointer;
      position: relative;
      padding: 10px 20px;
      &.active {
        @include foreground-active;
        font-weight: 700;
        color: $primary;
      }
    }
  }
  .container-right {
    float: left;
    width: 70%;
    height: 100%;
    padding: 6px 10px;
    box-sizing: border-box;
    .mz-tag {
      margin-right: 5px;
      margin-bottom: 5px;
      cursor: pointer;
    }
  }
}

.tag-list {
  height: calc(100% - 20px);
  overflow-y: auto;
}

.tag-list-tips {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}

.tag-select-modal-result {
  border-top: 1px solid $border-color;
  line-height: 32px;
  min-height: 32px;
  .mz-tag {
    margin-right: 4px;
    margin-bottom: 4px;
  }
}

:root[data-theme='dark'] {
  .tag-select-modal-container .type-list > li.active {
    color: $white;
  }
}
</style>
