<template>
  <mz-card class="acg-baike-basic">
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgBaikeBasic extends Vue {}
</script>

<style lang="scss">
.acg-baike-basic {
  position: relative;
  max-width: $screen-width-lg;
  margin: 0 auto;
}
</style>
