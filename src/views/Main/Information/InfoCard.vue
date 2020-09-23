<template>
  <mz-card outlined
    class="info-card">
    <div class="info-card-cover">
      <acg-image :src="item.cover"
        fit="cover">
      </acg-image>
    </div>
    <div class="info-card-core">
      <h3>{{item.title}}</h3>
      <p class="info-card-info">
        <span>来源：{{item.originCN}}</span>
        <span>时间：{{item.time}}</span>
      </p>
      <p class="info-card-desc">{{item.desc}}</p>
    </div>
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class InfoCard extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: object
}
</script>

<style lang="scss">
.info-card {
  position: relative;
  display: flex;
  height: 100%;
  border-radius: 4px;
  transition: all 0.2s;
  overflow: hidden;
  box-sizing: border-box;
  &:hover {
    transform: translateY(-5px);
    @include elevation(10);
  }
  &:active {
    opacity: 0.6;
  }

  .info-card-cover {
    flex: 1 0 auto;
    width: 30%;
    height: 100%;
  }

  .info-card-core {
    width: 70%;
    padding: 16px;
  }

  .info-card-info {
    margin-top: 8px;
    font-size: 12px;
    line-height: 14px;
    > span + span {
      margin-left: 10px;
    }
  }

  .info-card-desc {
    $line-height: 20px;
    $line: 3;
    @include multi-text-truncate($line);
    height: $line * $line-height;
    line-height: $line-height;
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>
