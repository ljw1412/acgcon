<template>
  <div class="acg-baike-info">
    <mz-image class="acg-baike-info-bg"
      background
      width="110%"
      height="110%"
      fit="cover"
      :src="info.cover"></mz-image>
    <div class="acg-baike-info-content">
      <div class="acg-baike-info-inner flex">
        <div class="acg-baike-info-cover">
          <mz-image fit="cover"
            :src="info.cover"></mz-image>
        </div>
        <div class="acg-baike-info-right">
          <mz-heading class="acg-baike-info-title"
            :level="1">{{info.title}}</mz-heading>
          <div class="acg-baike-info-tags">
            <mz-tag v-for="tag of info.tags"
              size="medium"
              outlined
              :color="tag.color"
              :key="tag.name">{{tag.name}}</mz-tag>
          </div>
          <div class="acg-baike-info-author">{{info.author}}</div>
          <div class="acg-baike-info-desc">{{info.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBaikeInfo extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeItem
}
</script>

<style lang="scss">
.acg-baike-info {
  height: 440px;
  background-color: $black-background-color;
  overflow: hidden;
  transform: translateZ(0);
}

.acg-baike-info-bg {
  position: absolute;
  top: -5%;
  background-repeat: no-repeat;
  z-index: 0;
  filter: blur(40px);
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}

.acg-baike-info-content {
  position: relative;
  max-width: 1600px;
  height: calc(100% - 50px);
  margin: 0 auto;
  padding: 0 40px;
  padding-top: 50px;
  box-sizing: border-box;
}

.acg-baike-info-inner {
  padding: 45px 0;
}

.acg-baike-info-cover {
  flex-shrink: 0;
  width: 225px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}

.acg-baike-info-right {
  flex-grow: 1;
  margin-left: 20px;
  color: #ffffff;
}

.acg-baike-info-title {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

.acg-baike-info-tags,
.acg-baike-info-author,
.acg-baike-info-desc {
  margin-top: 10px;
}

.acg-baike-info-tags {
  .mz-tag + .mz-tag {
    margin-left: 5px;
  }
}

.acg-baike-info-desc {
  @include multi-ellipsis(7);
}
</style>
