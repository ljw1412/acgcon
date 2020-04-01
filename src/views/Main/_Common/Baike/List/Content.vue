<template>
  <div class="acg-baike-content">
    <div v-for="item of list"
      class="acg-baike-content__item"
      :key="item._id">
      <mz-card :elevation="0">
        <mz-image src="https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3075428487,1084342510&fm=58&s=65F61AC6426290FC9548141A03001010"
          height="100%"
          width="40%"
          fit="cover"
          position="center"
          class="baike-cover"></mz-image>
        <div class="baike-info">
          <mz-heading class="baike-info__title"
            :level="6">标题</mz-heading>
        </div>
      </mz-card>
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
      display: flex;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.25s;
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24);
      }
    }

    .baike-cover {
      flex-shrink: 0;
    }

    .baike-info {
      flex-grow: 1;
      padding: 5px 10px;
      &__title {
        font-weight: 500;
      }
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
