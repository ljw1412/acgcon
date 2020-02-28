<template>
  <div class="acg-baike">
    <mz-button @click="fetchTags">查询Tags</mz-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'

@Component
export default class AcgBaike extends AcgVue {
  get baikeType() {
    return this.$route.params.baikeType || this.acgType
  }

  async fetchTags() {
    const tags = await this.$get('baike/tags', {
      params: { acgType: this.acgType, type: this.baikeType }
    })
  }
}
</script>

<style lang="scss">
</style>