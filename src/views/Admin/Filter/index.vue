<template>
  <acg-base-layout class="acg-admin-filter">
    <template #action>
      <template v-if="!sort">
        <mz-select v-model="acgType"
          style="width:100px;"
          placeholder="ACG类型">
          <mz-option v-for="item of acgTypeList"
            :key="item.value"
            :value="item.value"
            :label="item.label"></mz-option>
        </mz-select>
        <mz-select v-model="baikeType"
          style="width:100px;"
          placeholder="百科类型">
          <mz-option v-for="item of baikeTypeList"
            :key="item.value"
            :value="item.value"
            :label="item.label"></mz-option>
        </mz-select>
        <mz-button color="primary"
          key="btn-new"
          @click="displayGroupAddModal">新增标签组</mz-button>
        <mz-button color="primary"
          outlined
          key="btn-sort"
          @click="handleSort">标签组排序</mz-button>
      </template>
      <template v-else>
        <mz-button color="danger"
          key="btn-sort-cancel"
          @click="handleUnsort">放弃排序</mz-button>
        <mz-button color="success"
          key="btn-sort-save"
          @click="handleSaveSort">保存排序</mz-button>
      </template>
    </template>

    <draggable v-model="list"
      group="tag-group"
      class="tag-group-draggable"
      handle=".tag-group-reorder"
      ghost-class="is-ghost">
      <transition-group tag="mz-row"
        name="flip-list">
        <mz-col v-for="item of list"
          style="margin-bottom:10px;"
          class="tag-group"
          :key="item._id"
          :md="12"
          :lg="8">
          <tag-group :data="item"
            :sort="sort"
            @delete="handleTagGroupDelete"></tag-group>
        </mz-col>
      </transition-group>
    </draggable>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getBaikeTypesByAcgType } from '@/configs/index'
import TagGroup from './TagGroup.vue'

@Component({ components: { TagGroup } })
export default class AcgAdminFilter extends Vue {
  acgType = ''
  acgTypeList = [
    { value: 'animation', label: '动画' },
    { value: 'comic', label: '漫画' },
    { value: 'game', label: '游戏' }
  ]
  baikeType = ''
  baikeTypeList: Record<string, any>[] = []
  list: Record<string, any>[] = []
  listBak: Record<string, any>[] = []
  sort = false

  async fetchFilterList() {
    this.list = await this.$get('baike/filter', {
      params: { acgType: this.acgType, type: this.baikeType }
    })
  }

  async createFilter(name: string) {
    return await this.$post('baike/filter', {
      name,
      acgType: this.acgType,
      type: this.baikeType
    })
  }

  async saveGroupOrder() {
    await this.$post('baike/filter/update_order', {
      list: this.list.map(item => item._id),
      acgType: this.acgType,
      type: this.baikeType
    })
  }

  async displayGroupAddModal() {
    try {
      const text = await this.$modal.prompt({
        title: '新增标签组',
        content: '请输入标签组名称',
        rules: { test: /.{1,8}/, message: '请输入1-8个字符' }
      })
      const tagGroup = await this.createFilter(text as string)
      // await this.fetchFilterList()
      this.list.push(tagGroup)
    } catch (error) {}
  }

  handleSort() {
    this.sort = true
    this.listBak = this.list.slice(0)
  }

  handleUnsort() {
    this.sort = false
    this.list = this.listBak
  }

  async handleSaveSort() {
    await this.saveGroupOrder()
    await this.fetchFilterList()
    this.sort = false
  }

  handleTagGroupDelete(item: any) {
    this.list.remove(item)
  }

  @Watch('acgType')
  onAcgTypeChange(val: Acgcon.Types) {
    this.baikeTypeList = getBaikeTypesByAcgType(val)
    this.baikeType = this.baikeTypeList[0].value
  }

  @Watch('baikeType')
  onBaikeType() {
    this.fetchFilterList()
  }

  mounted() {
    this.acgType = 'animation'
  }
}
</script>

<style lang="scss">
.acg-admin-filter {
  .tag-group.is-ghost .acg-admin-tag-group {
    box-shadow: 0 0 10px $color-primary;
    opacity: 0.5;
  }
}

.tag-group-draggable {
  > .mz-row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
    > .mz-col {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
}
</style>
