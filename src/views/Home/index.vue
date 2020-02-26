<template>
  <div class="home not-user-select">
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
import StartHeader from './components/start/Header.vue'
import StartMenu from './components/start/Menu.vue'
@Component({
  components: {
    StartHeader,
    StartMenu
  }
})
export default class Home extends Vue {
  logger = this.$getAcgLogger('Home')
  backgroundUrl = ''

  async fetchBackground() {
    const bgData =
      localStorage.getItem('home-background') || '{"url":"","updateTime":0}'
    let { url, updateTime } = JSON.parse(bgData)
    if (url) this.backgroundUrl = url
    // 如果距离上一次请求小于2小时，优先使用本地存储的背景地址。
    if (moment().diff(moment(updateTime), 'hours') > 2) {
      try {
        const imageList = await this.$get('base/bg_bing')
        url = imageList[0].url
        localStorage.setItem(
          'home-background',
          JSON.stringify({ url, updateTime: +new Date() })
        )
      } catch (error) {
        this.logger.error('获取背景失败!')
      }
    }
    this.backgroundUrl = url
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