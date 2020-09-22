<template>
  <div class="acg-header-logo d-flex user-select-none text-white mt-16">
    <div class="title mr-10">ACG控</div>
    <div>
      <div class="sub-title">{{current.title}}</div>
      <div class="text">{{current.text}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

const logoMap: Record<string, any> = {
  animation: { title: '动画百科', text: 'Animation' },
  comic: { title: '漫画百科', text: 'Comic' },
  game: { title: '游戏百科', text: 'Game' }
}

@Component
export default class TopLogo extends Vue {
  @Prop(String)
  readonly acgType!: Acgcon.Types

  get current() {
    const acgType = this.$route.params.acgType || this.acgType
    return logoMap[acgType] || {}
  }
}
</script>

<style lang="scss">
.acg-header-logo {
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
  .title {
    font-size: 60px;
    line-height: 60px;
  }
  .sub-title {
    font-size: 40px;
    line-height: 40px;
  }
  .text {
    font-size: 20px;
    line-height: 20px;
  }
}
@media screen and (max-width: 425px) {
  .acg-header-logo {
    text-align: center;
    .title {
      display: none;
    }
  }
}
</style>