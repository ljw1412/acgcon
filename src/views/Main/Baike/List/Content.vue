<template>
  <div class="baike-content">
    <router-link v-for="item of list"
      class="baike-item d-inline-flex acg-clickable pl-20 pb-20"
      target="_blank"
      :to="{name:'BaikeDetail',params:{...$route.params,id:item._id}}"
      :key="item._id">
      <mz-card class="d-flex w-100 rounded-sm overflow-hidden">
        <acg-image :src="item.cover"
          fit="cover"
          position="center"
          class="baike-cover flex-shrink-0 h-100"></acg-image>

        <div class="baike-info flex-grow-1 px-10 py-5">
          <div class="title mb-4 fs-16">{{item.title}}</div>
          <div class="tags mb-4">
            <mz-tag v-for="tag of item.tags"
              size="small"
              :color="tag.color"
              :key="tag.name">{{tag.name}}</mz-tag>
          </div>
          <div class="author mb-4 fs-14">{{item.author}}</div>
          <div class="desc fs-12">{{item.desc}}</div>
        </div>
      </mz-card>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'

@Component
export default class BaikeContent extends AcgVue {
  @Prop({ type: Array, default: () => [] })
  readonly list!: Record<string, any>
}
</script>

<style lang="scss">
.baike-content {
  width: 100%;

  .baike-item {
    height: 200px;
    box-sizing: border-box;
    transition: height 0.15s linear;
    will-change: width, height;
    vertical-align: top;
  }

  .mz-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.1s;
    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24);
    }
    &:active {
      transform: scale(0.95);
    }
  }

  .baike-cover {
    width: 36%;
  }

  .baike-info {
    width: 64%;
    box-sizing: border-box;

    .title {
      @include text-truncate;
      font-weight: 500;
    }

    .tags {
      @include text-truncate;
      font-size: 0;
      .mz-tag + .mz-tag {
        margin-left: 2px;
      }
    }

    .author {
      @include text-truncate;
      color: $color-text-regular;
    }

    .desc {
      @include multi-text-truncate(6);
      color: $color-text-secondary;
    }
  }
}

@media screen and (min-width: 1500px) {
  .baike-content .baike-item {
    width: 33.33%;
    &:nth-child(3n - 2) {
      padding-left: 0;
    }
  }
}

@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .baike-content .baike-item {
    width: 50%;
    height: 240px;
    &:nth-child(2n - 1) {
      padding-left: 0;
    }
  }
}

@media screen and (max-width: 1200px) {
  .baike-content .baike-item {
    width: 100%;
    height: 260px;
    padding-left: 0;
  }
}
</style>
