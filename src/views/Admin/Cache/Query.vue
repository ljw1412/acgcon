<template>
  <div class="admin-cache-query">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AdminCacheQuery extends Vue {
  type = 'all'
  typeMap: Record<string, any> = {
    all: { label: '全部' },
    user: { label: '用户', placeholder: '请输入用户id' },
    tag: { label: '标签', placeholder: '请输入{acgtype}_{type}' }
  }
  keyword = ''

  get placeholder() {
    const typeData = this.typeMap[this.type]
    if (typeData && typeData.placeholder) {
      return typeData.placeholder
    }
    return '请输入缓存key'
  }

  handleQuery() {
    this.$emit('query', this.type, this.keyword)
  }
}
</script>

<style lang="scss">
.admin-cache-query {
  > * + * {
    margin-left: 10px;
  }
}
</style>
