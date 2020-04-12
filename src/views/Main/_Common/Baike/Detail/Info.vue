<template>
  <div class="acg-baike-info-wrp">
    <div class="acg-baike-info">
      <mz-image class="acg-baike-info-bg"
        background
        width="110%"
        height="110%"
        fit="cover"
        :src="info.cover"></mz-image>
      <div class="acg-baike-info-content">
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
      </div>
    </div>
    <mz-card class="acg-baike-info-card">
      <div class="acg-baike-info-cover">
        <mz-image fit="cover"
          :src="info.cover"></mz-image>
      </div>
      <div class="acg-baike-info-desc">{{info.desc}}</div>
    </mz-card>
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
$transition: all 0.15s linear;

.acg-baike-info-wrp {
  position: relative;
}

.acg-baike-info {
  height: 440px;
  background-color: $black-background-color;
  overflow: hidden;
  transform: translateZ(0);
  transition: $transition;
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
  height: 100%;
  margin: 0 auto;
  padding: 120px 40px 0 330px;
  box-sizing: border-box;
  color: #ffffff;
  transition: $transition;
}

.acg-baike-info-title {
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
}

.acg-baike-info-tags,
.acg-baike-info-author {
  margin-top: 10px;
}

.acg-baike-info-tags {
  .mz-tag + .mz-tag {
    margin-left: 5px;
  }
}

.acg-baike-info-card {
  position: relative;
  min-height: 500px;
  max-width: $screen-width-lg;
  margin: -200px auto 20px;
  border-radius: 10px;
  padding: 20px 40px;
  box-sizing: border-box;
}

.acg-baike-info-cover {
  position: absolute;
  top: -140px;
  left: 40px;
  width: 255px;
  height: 340px;
  box-shadow: 2px 1px 10px rgba($color: #000000, $alpha: 0.5);
  transition: $transition;
  img {
    width: 100%;
    height: 100%;
  }
}

.acg-baike-info-desc {
  margin-left: 290px;
  min-height: 180px;
  transition: $transition;
}

@media screen and (max-width: $screen-width-sm) {
  .acg-baike-info {
    height: 280px;
  }

  .acg-baike-info-content {
    padding: 60px 20px 0 190px;
  }

  .acg-baike-info-title {
    font-size: 22px;
  }

  .acg-baike-info-card {
    margin-top: 0;
    padding: 20px;
  }

  .acg-baike-info-cover {
    width: 150px;
    height: 200px;
    left: 20px;
    top: -220px;
  }
  .acg-baike-info-desc {
    margin-left: 0;
  }
}
</style>
