<template>
  <div class="baike-detail">
    <baike-header :baike="baike"></baike-header>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BaikeHeader from './Header.vue'
import { fetchBaike } from '@/services/baike'

@Component({ components: { BaikeHeader } })
export default class AcgBaikeDetail extends Vue {
  @Prop(String)
  readonly id!: string

  baike = {}

  async fetchBaike() {
    this.baike = await fetchBaike(this.id)
  }

  created() {
    this.fetchBaike()
  }
}
</script>

<style lang="scss">
</style>
