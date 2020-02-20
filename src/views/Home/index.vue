<template>
  <div class="home">
    <div class="bg"
      :style="{'background-image':`url('${backgroundUrl}')`}"></div>
    <div class="start">
      <start-header></start-header>
      <start-menu></start-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StartHeader from './StartHeader.vue'
import StartMenu from './StartMenu.vue'
@Component({
  components: {
    StartHeader,
    StartMenu
  }
})
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

  .start {
    width: 1648px;
    margin: 0 auto;
    transform-origin: top;
  }
}

@media screen and(max-width: 1680px) and(min-width: 1261px) {
  .home {
    .start {
      width: 1236px;
    }
    .start-menu__column:nth-child(4) {
      margin-left: 0;
      width: 100%;
    }
  }
}

@media screen and(max-width: 1260px) and(min-width:865px) {
  .home {
    .start {
      width: 824px;
    }
    .start-menu__column:nth-child(2n + 1) {
      margin-left: 0;
    }
  }
}

@media screen and(max-width:864px) {
  .home {
    .start {
      max-width: 700px;
      width: 100%;
    }
    .start-header {
      padding: 32px 16px 24px 16px;
    }
    .start-menu__column {
      margin-left: 0;
    }
  }
}
</style>