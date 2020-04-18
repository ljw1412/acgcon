<template>
  <div class="acg-baike-header">
    <mz-image class="acg-baike-header-bg"
      background
      width="110%"
      height="110%"
      fit="cover"
      :src="info.cover"></mz-image>
    <div class="acg-baike-header-content">
      <mz-heading class="acg-baike-header-title"
        :level="1">{{info.title}}</mz-heading>
      <div class="acg-baike-header-tags">
        <mz-tag v-for="tag of info.tags"
          size="medium"
          outlined
          :color="tag.color"
          :key="tag.name">{{tag.name}}</mz-tag>
      </div>
      <div class="acg-baike-header-author">{{info.author}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBaikeHeader extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeItem
}
</script>

<style lang="scss">
@import '../var.scss';

.acg-baike-header {
  height: 440px;
  background-color: $black-background-color;
  overflow: hidden;
  transform: translateZ(0);
  transition: $base-transition;
}

.acg-baike-header-bg {
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

.acg-baike-header-content {
  position: relative;
  max-width: 1600px;
  height: 100%;
  margin: 0 auto;
  padding: 120px 40px 0 330px;
  box-sizing: border-box;
  color: #ffffff;
  transition: $base-transition;
}

.acg-baike-header-title {
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
}

.acg-baike-header-tags,
.acg-baike-header-author {
  margin-top: 10px;
}

.acg-baike-header-tags {
  .mz-tag + .mz-tag {
    margin-left: 5px;
  }
}

@media screen and (max-width: $screen-width-sm) {
  .acg-baike-header {
    height: 280px;
  }

  .acg-baike-header-content {
    padding: 60px 20px 0 190px;
  }

  .acg-baike-header-title {
    font-size: 22px;
  }
}
</style>
