<template>
  <div class="acg-baike-content">
    <router-link v-for="item of list"
      class="acg-baike-content__item acg-clickable"
      target="_blank"
      :to="{name:'baikeDetail',params:{...$route.params,id:item._id}}"
      :key="item._id">
      <mz-card :elevation="0">
        <acg-image :src="item.cover"
          fit="cover"
          position="center"
          class="baike-cover"></acg-image>

        <div class="baike-info">
          <mz-heading class="baike-info__title"
            :level="7">{{item.title}}</mz-heading>
          <div class="baike-info__tags">
            <mz-tag v-for="tag of item.tags"
              size="small"
              :color="tag.color"
              :key="tag.name">{{tag.name}}</mz-tag>
          </div>
          <mz-heading class="baike-info__author"
            :level="8">{{item.author}}</mz-heading>
          <mz-heading class="baike-info__desc"
            :level="9">{{item.desc}}</mz-heading>
        </div>
      </mz-card>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import { baikeList } from '@/configs/mock'

@Component
export default class AcgBaikeContent extends AcgVue {
  list = baikeList
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
    vertical-align: top;
    .mz-card {
      cursor: pointer;
      display: flex;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.1s;
      overflow: hidden;
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24);
      }
      &:active {
        transform: scale(0.95);
      }
    }

    .baike-cover {
      flex-shrink: 0;
      width: 36%;
      height: 100%;
    }

    .baike-info {
      flex-grow: 1;
      width: 64%;
      padding: 5px 10px;
      box-sizing: border-box;

      &__title {
        @include text-truncate;
        font-weight: 500;
        margin-bottom: 4px;
      }

      &__tags {
        @include text-truncate;
        margin-bottom: 4px;
        font-size: 0;
        .mz-tag + .mz-tag {
          margin-left: 2px;
        }
      }

      &__author {
        @include text-truncate;
        color: $color-text-regular;
        margin-bottom: 4px;
      }

      &__desc {
        @include multi-text-truncate(6);
        color: $color-text-secondary;
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
