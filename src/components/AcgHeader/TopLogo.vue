<template>
  <div class="top-logo user-select-none text-white d-flex">
    <div class="top-logo__title mr-10">ACG控</div>
    <div>
      <div class="top-logo__sub-title">{{current.title}}</div>
      <div class="top-logo__text">{{current.text}}</div>
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
.top-logo {
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
  &__title {
    font-size: 60px;
    line-height: 60px;
  }
  &__sub-title {
    font-size: 40px;
    line-height: 40px;
  }
  &__text {
    font-size: 20px;
    line-height: 20px;
  }
}
@media screen and (max-width: 425px) {
  .top-logo {
    text-align: center;
    &__title {
      display: none;
    }
  }
}
</style>