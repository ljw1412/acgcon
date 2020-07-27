<template>
  <div class="top-banner w-100 h-100"
    :style="{backgroundImage:`url(${bgUrl})`}">
    <div class="top-banner__content d-flex flex-column align-items-center">
      <top-logo></top-logo>
      <top-search></top-search>
    </div>
    <div class="top-banner__bottom-shade w-100"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TopLogo from './TopLogo.vue'
import TopSearch from './TopSearch.vue'
@Component({ components: { TopLogo, TopSearch } })
export default class TopBanner extends Vue {
  @Prop({ type: String, default: '' })
  readonly bgUrl!: string
}
</script>

<style lang="scss">
.top-banner {
  background-color: $black-background-color;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &__content {
    padding-top: 80px;
    .top-search {
      margin-top: 20px;
    }
  }

  &__bottom-shade {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 140px;
    z-index: 1;
    background: linear-gradient(180deg, rgba(22, 22, 26, 0), #16161a 100%);
  }
}
</style>