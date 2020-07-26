<template>
  <mz-carousel class="start-carousel">
    <mz-carousel-item class="bg-indigo"></mz-carousel-item>
    <mz-carousel-item class="bg-success"></mz-carousel-item>
    <mz-carousel-item class="bg-warning"></mz-carousel-item>
    <mz-carousel-item class="bg-danger"></mz-carousel-item>

    <template #indicator="{item, pageIndex, length}">
      <div class="start-carousel-info">
        ({{pageIndex}}/{{length}})
      </div>
    </template>
  </mz-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class StartCarousel extends Vue {}
</script>

<style lang="scss">
$carousel-height: 75%;

.start-carousel {
  .mz-carousel {
    height: $carousel-height;
  }
}

.start-carousel-info {
  color: $color-text-primary;
  height: 100% - $carousel-height;
}
</style>
