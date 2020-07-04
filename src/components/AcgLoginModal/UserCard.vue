<template>
  <svg width="400"
    height="160"
    class="acg-user-card"
    :class="{'animation':animation}"
    viewBox="0 0 400 160">
    <line x1="0"
      y1="0"
      x2="400"
      y2="0"
      class="border-line top"></line>
    <line x1="0"
      y1="160"
      x2="400"
      y2="160"
      class="border-line bottom"></line>
    <line x1="0"
      y1="0"
      x2="0"
      y2="160"
      class="border-line left"></line>
    <line x1="400"
      y1="0"
      x2="400"
      y2="160"
      class="border-line right"></line>
    <rect x="20"
      y="20"
      width="120"
      height="120"
      fill="none"
      class="avatar-border">
    </rect>
    <image :xlink:href="user.avatar"
      x="20"
      y="20"
      height="120"
      width="120"
      preserveAspectRatio="xMidYMid slice" />
    <text x="160"
      y="44"
      font-size="24"
      class="nickname">{{user.nickname}}</text>
    <text x="160"
      y="70"
      font-size="14"
      class="nickname">{{user.email}}</text>
    <text x="160"
      y="100"
      font-size="14"
      class="nickname">身份：{{user.role}}</text>
    <text x="160"
      y="130"
      font-size="12"
      class="nickname">注册于{{user.regtime}}</text>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgUserCard extends Vue {
  @Prop(Boolean)
  readonly animation!: boolean
  @Prop({ type: Object, default: () => ({}) })
  readonly user!: object
}
</script>

<style lang="scss">
@mixin line-dash($width, $reverse: false) {
  stroke-dasharray: $width;
  stroke-dashoffset: $width * if($reverse, -1, 1);
}

.acg-user-card.animation {
  .border-line {
    stroke: #fff;
    stroke-width: 2;
    animation: acg-user-card-dash 1s ease-in forwards;
    &.top {
      @include line-dash(400);
    }
    &.bottom {
      @include line-dash(400, true);
    }
    &.left {
      @include line-dash(160, true);
    }
    &.right {
      @include line-dash(160);
    }
  }
  .avatar-border {
    stroke: #fff;
    stroke-width: 1;
    stroke-dasharray: 1300;
    stroke-dashoffset: -480;
    animation: acg-user-card-dash 1s ease-in 1s forwards;
  }

  .nickname {
    fill: #fff;
  }
}

@keyframes acg-user-card-dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
