<template>
  <div class="acg-navigation">
    <nav-link :links="navList"></nav-link>
  </div>
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
  padding-top: 10px;
  margin-top: -60px;
  line-height: 50px;
  box-sizing: border-box;
  background-image: linear-gradient(0, rgba(0, 0, 0, 0.8) 0, transparent 100%);
  .nav-link {
    width: 1600px;
    margin: 0 auto;
    .nav-link-ul {
      .nav-link-item {
        padding: 0 20px;
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .acg-navigation .nav-link {
    width: 100%;
  }
}
</style>