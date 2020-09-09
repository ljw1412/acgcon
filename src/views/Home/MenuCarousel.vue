<template>
  <mz-carousel class="acg-menu-carousel">
    <mz-carousel-item class="bg-indigo"></mz-carousel-item>
    <mz-carousel-item class="bg-success"></mz-carousel-item>
    <mz-carousel-item class="bg-warning"></mz-carousel-item>
    <mz-carousel-item class="bg-danger"></mz-carousel-item>

    <template #indicator="{item, pageIndex, length}">
      <div class="acg-menu-carousel-info">
        ({{pageIndex}}/{{length}})
      </div>
    </template>
  </mz-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgMenuCarousel extends Vue {}
</script>

<style lang="scss">
$carousel-height: 75%;

.acg-menu-carousel {
  .mz-carousel {
    height: $carousel-height;
  }
}

.acg-menu-carousel-info {
  color: $color-text-primary;
  height: 100% - $carousel-height;
}
</style>
