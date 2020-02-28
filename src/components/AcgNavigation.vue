<template>
  <!-- 粘性导航栏 -->
  <mz-fixed-section class="acg-navigation-wrapper"
    sticky
    placeholder>
    <nav-link :links="navList"
      class="acg-navigation"></nav-link>
  </mz-fixed-section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavLink from './AcgHeader/NavLink.vue'
import { getNavByAcgType } from '@/configs/base'

@Component({ components: { NavLink } })
export default class AcgNavigation extends Vue {
  get acgType() {
    return this.$route.params.acgType as Acgcon.Types
  }

  get navList() {
    return getNavByAcgType(this.acgType)
  }
}
</script>

<style lang="scss">
.acg-navigation {
  height: 60px;
  width: 100%;
  padding-top: 20px;
  margin-top: -60px;
  line-height: 30px;
  box-sizing: border-box;
  transition: all 0.3s;
  .nav-link-ul {
    width: 1600px;
    margin: 0 auto;
    .nav-link-item {
      padding: 0 20px;
    }
  }
}

.acg-navigation-wrapper > .mz-fixed-section.is-sticky > .acg-navigation {
  margin-top: 0;
  padding-top: 15px;
  background-image: none;
  background-color: #ffffff;
  box-shadow: 0 -1px 2px rgba(#000, 0.3);
  .link {
    color: #333333;
  }
}

@media screen and (max-width: 1600px) {
  .acg-navigation .nav-link-ul {
    width: 100%;
  }
}
</style>