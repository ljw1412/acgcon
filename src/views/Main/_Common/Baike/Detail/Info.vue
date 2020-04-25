<template>
  <acg-title-card class="acg-baike-info">
    <div class="acg-baike-info-cover">
      <mz-image fit="cover"
        :src="info.cover"></mz-image>
    </div>
    <div class="acg-baike-info-desc">{{info.desc}}</div>
  </acg-title-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBaikeInfo extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly info!: Acgcon.BaikeData
}
</script>

<style lang="scss">
@import '../var.scss';

.acg-baike-info {
  min-height: 280px;
  margin-top: -200px;
  margin-bottom: 20px;
}

.acg-baike-info-cover {
  position: absolute;
  top: -140px;
  left: 40px;
  width: 255px;
  height: 340px;
  box-shadow: 2px 1px 10px rgba($color: #000000, $alpha: 0.5);
  transition: $base-transition;
  img {
    width: 100%;
    height: 100%;
  }
}

.acg-baike-info-desc {
  margin-left: 290px;
  transition: $base-transition;
}

@media screen and (max-width: $screen-width-sm) {
  .acg-baike-info {
    margin-top: 0;
    min-height: inherit;
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
