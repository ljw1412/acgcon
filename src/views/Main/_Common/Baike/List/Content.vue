<template>
  <div class="acg-baike-content">
    <div v-for="item of list"
      class="acg-baike-content__item"
      :key="item._id">
      <mz-card :elevation="0">123</mz-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'

@Component
export default class AcgBaikeContent extends AcgVue {
  list = [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }]
}
</script>

<style lang="scss">
@import '../var.scss';
.acg-baike-content {
  width: calc(100% - #{$filter-width} - 20px);
  transition: width 0.15s linear;
  will-change: width;

  &__item {
    display: inline-flex;
    height: 200px;
    padding-left: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    transition: height 0.15s linear;
    will-change: width, height;
    .mz-card {
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
  }
}

@media screen and (min-width: 1500px) {
  .acg-baike-content__item {
    width: 33.33%;
    &:nth-child(3n - 2) {
      padding-left: 0;
    }
  }
}

@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .acg-baike-content__item {
    width: 50%;
    height: 240px;
    &:nth-child(2n - 1) {
      padding-left: 0;
    }
  }
}

@media screen and (max-width: 1200px) {
  .acg-baike-content__item {
    width: 100%;
    height: 260px;
    padding-left: 0;
  }
}
</style>
