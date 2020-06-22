<template>
  <acg-base-layout class="acg-admin-cache">
    <template #action>
      <mz-select v-model="type"
        style="width:100px">
        <mz-option v-for="(t,value) of typeMap"
          :key="value"
          :label="t.label"
          :value="value"></mz-option>
      </mz-select>
      <mz-input v-model="keyword"
        style="width:200px"
        :placeholder="placeholder"></mz-input>
      <mz-button color="primary"
        @click="handleQuery">查询</mz-button>
    </template>

    <mz-table-simple lined
      header
      align="center"
      class="query-table"
      :data="tableData">
      <template #td="{item}">
        {{item.value}}
        <template v-if="item.type==='action'">
          <mz-button flat
            color="success"
            @click="handleShowCache(item.key)">查看</mz-button>
          <mz-button flat
            color="danger"
            @click="handleDeleteCache(item.key)">删除</mz-button>
        </template>
      </template>
    </mz-table-simple>
  </acg-base-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgAdminCache extends Vue {
  type = 'all'
  typeMap: Record<string, any> = {
    all: { label: '全部' },
    user: { label: '用户', placeholder: '请输入用户id' },
    tag: { label: '标签', placeholder: '请输入{acgtype}_{type}' }
  }
  result: string[] = []
  keyword = ''

  get placeholder() {
    const typeData = this.typeMap[this.type]
    if (typeData && typeData.placeholder) {
      return typeData.placeholder
    }
    return '请输入缓存key'
  }

  get tableData() {
    const data: any[] = [['key', '操作']]
    data.push(
      ...this.result.map(key => [
        { value: key, type: 'key' },
        { key, type: 'action' }
      ])
    )
    return data
  }

  async fetchList() {
    return await this.$get('cache', {
      params: { type: this.type, keyword: this.keyword, count: 150 }
    })
  }

  async fetchValue(key: string) {
    return await this.$get(`cache/${key}`)
  }

  async deleteCache(key: string) {
    return await this.$del(`cache/${key}`)
  }

  async handleQuery() {
    this.result = await this.fetchList()
  }

  async handleShowCache(key: string) {
    let data = await this.fetchValue(key)
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    await this.$modal.alert(data, key)
  }

  async handleDeleteCache(key: string) {
    try {
      await this.$modal.confirm({
        title: '删除确认',
        content: `确认删除缓存[${key}]?`,
        confirm: { color: 'danger' }
      })
      await this.deleteCache(key)
      this.result.remove(key)
    } catch (error) {}
  }
}
</script>

<style lang="scss">
.acg-admin-cache {
  .query-table {
    background-color: #fff;
    th:nth-child(1) {
      width: 50%;
    }
    th:nth-child(2) {
      width: 50%;
    }
  }
}
</style>
