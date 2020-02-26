<template>
  <div class="top-banner"
    :style="{backgroundImage:`url(${bgUrl})`}"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class TopBanner extends Vue {
  @Prop({ type: String, default: '' })
  readonly bgUrl!: string
}
</script>

<style lang="scss">
.top-banner {
  width: 100%;
  height: 100%;
  background-color: #333;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>