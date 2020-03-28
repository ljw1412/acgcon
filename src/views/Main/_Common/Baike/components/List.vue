<template>
  <div class="acg-baike-list">
    <mz-heading class="acg-baike-list__title"
      :level="7">
      <span>标题</span>
      <div class="acg-baike-list__switch-layout">
        <mz-icon name="md-list"></mz-icon>
        <mz-icon name="md-grid"></mz-icon>
      </div>
    </mz-heading>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgBaikeList extends Vue {}
</script>

<style lang="scss" scoped>
.acg-baike-list {
  padding: 16px 26px;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.5em;
    padding-bottom: 12px;
  }

  &__switch-layout {
    font-size: 22px;
  }
}
</style>
