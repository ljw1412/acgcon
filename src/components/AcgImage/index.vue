<template>
  <mz-image class="acg-image"
    v-bind="$attrs"
    v-on="$listeners">
    <slot></slot>
    <template #error>
      <slot name="error">
        <div class="acg-image__error">图片加载失败</div>
      </slot>
    </template>
  </mz-image>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ inheritAttrs: false })
export default class AcgImage extends Vue {}
</script>

<style lang="scss">
.acg-image {
  width: 100%;
  height: 100%;
  &__error {
    width: 100%;
    height: 100%;
    background: #eee;
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
