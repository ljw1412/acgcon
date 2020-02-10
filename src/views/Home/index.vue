<template>
  <div class="home">
    <div class="bg"
      :style="{'background-image':`url('${backgroundUrl}')`}"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {
  backgroundUrl = ''

  async fetchBackground() {
    const imageList = (await this.$axios.get('base/bg_bing')).data
    this.backgroundUrl = imageList[0].url
  }

  mounted() {
    this.fetchBackground()
  }
}
</script>

<style lang="scss">
.home {
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00a1d6;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -10;
  }
}
</style>