<template>
  <div class="baike-detail-header position-relative">
    <div class="bg-wrapper">
      <mz-image class="bg"
        background
        width="110%"
        height="110%"
        fit="cover"
        :src="baike.cover"></mz-image>
    </div>

    <div class="info position-absolute">
      <mz-heading class="title"
        :level="1">{{baike.title}}</mz-heading>
      <div class="tags">
        <mz-tag v-for="tag of baike.tags"
          size="medium"
          outlined
          :color="tag.color || '#ffffff'"
          :key="tag.name">{{tag.name}}</mz-tag>
      </div>
      <div class="author">{{baike.author}}</div>
    </div>

    <mz-card class="info-card position-relative">
      <div class="cover">
        <mz-image fit="cover"
          :src="baike.cover"></mz-image>
      </div>
    </mz-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaikeDetailHeader extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly baike!: Record<string, any>
}
</script>

<style lang="scss">
.baike-detail-header {
  .bg-wrapper {
    height: 440px;
    background-color: $black-background-color;
    overflow: hidden;
    transform: translateZ(0);
    transition: all 0.15s linear;
    .bg {
      filter: blur(40px);
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);
      }
    }
  }

  .info {
    top: 100px;
    left: 330px;
    color: #ffffff;

    .title {
      color: #ffffff;
      text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
    }

    .tags,
    .author {
      margin-top: 10px;
    }

    .mz-tag + .mz-tag {
      margin-left: 5px;
    }
  }

  .info-card {
    min-height: 220px;
    margin-top: -200px;
    margin-bottom: 20px;
    .cover {
      position: absolute;
      top: -140px;
      left: 40px;
      width: 255px;
      height: 340px;
      box-shadow: 2px 1px 10px rgba($color: #000000, $alpha: 0.5);
      transition: all 0.15s linear;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
