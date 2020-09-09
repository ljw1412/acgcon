<template>
  <div class="acg-home user-select-none">
    <div class="bg w-100 h-100"
      :style="{'background-image':`url('${bgUrl}')`}"></div>
    <div class="start">
      <home-header></home-header>
      <home-menu></home-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeHeader from './Header.vue'
import HomeMenu from './Menu.vue'
import { fetchBingBackground } from '@/services/common'
import { createStore } from '@/helpers/localstorage'

const bgStore = createStore('acg_home_background')

@Component({ components: { HomeHeader, HomeMenu } })
export default class AcgHome extends Vue {
  bgUrl = ''

  async loadBackground() {
    const bgData = bgStore.get({ url: '', updateTime: 0 })
    // 如果距离上一次请求小于2小时，优先使用本地存储的背景地址。
    if (moment().diff(moment(bgData.updateTime), 'hours') > 2) {
      try {
        const imageList = await fetchBingBackground()
        bgData.url = imageList[0].url
        bgData.updateTime = +new Date()
        bgStore.set(bgData)
      } catch (error) {
        console.error(error)
      }
    }
    this.bgUrl = bgData.url
  }

  created() {
    this.loadBackground()
  }
}
</script>

<style lang="scss">
.acg-home {
  .bg {
    position: fixed;
    top: 0;
    left: 0;
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
  .acg-home {
    .start {
      width: 1236px;
    }
    .acg-home-menu .column:nth-child(4) {
      margin-left: 0;
      width: 100%;
    }
  }
}

@media screen and(max-width: 1260px) and(min-width:865px) {
  .acg-home {
    .start {
      width: 824px;
    }
    .acg-home-menu .column:nth-child(2n + 1) {
      margin-left: 0;
    }
  }
}

@media screen and(max-width:$screen-width-sm) {
  .acg-home {
    .start {
      max-width: 700px;
      width: 100%;
    }
    .acg-home-header {
      padding: 32px 16px 24px 16px;
    }
    .acg-home-menu .column {
      margin-left: 0;
    }
  }
}
</style>
