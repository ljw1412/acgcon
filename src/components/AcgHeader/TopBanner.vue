<template>
  <div class="top-banner"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class TopBanner extends Vue {}
</script>

<style lang="scss">
.top-banner {
  width: 100%;
  height: 100%;
  background-color: #333;
}
</style>