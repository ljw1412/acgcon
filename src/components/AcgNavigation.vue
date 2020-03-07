<template>
  <mz-fixed-section class="acg-navigation-wrapper"
    sticky
    placeholder>
    <div class="acg-navigation">
      <div class="acg-navigation__content flex-center-space-between">
        <nav-link :links="navList"></nav-link>
        <div class="acg-navigation__right">

          <div class="acg-navigation__user"></div>
        </div>
      </div>
    </div>
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
.acg-navigation-wrapper {
  margin-top: -60px;
}

.acg-navigation {
  height: 60px;
  width: 100%;
  padding-top: 20px;
  line-height: 30px;
  box-sizing: border-box;

  &__content {
    max-width: 1600px;
    margin: 0 auto;
    .nav-link-ul {
      padding: 0 12px;
      .nav-link-item--active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: var(--color-primary);
      }
    }
    .link {
      padding: 0 14px;
    }
  }
  &__right {
    flex-shrink: 0;
  }

  &__user {
    display: none;
    width: 60px;
    height: 60px;
    background-color: red;
  }
}

.mz-fixed-section.is-sticky {
  .acg-navigation {
    padding-top: 0;
    background-image: none;
    background-color: #ffffff;
    box-shadow: 0 -1px 5px rgba(#000, 0.3);
    transition: all 0.2s;
    &__content {
      height: 100%;
    }
    &__user {
      display: block;
    }

    .link {
      color: #333333;
    }
  }
}

@media screen and (max-width: 1600px) {
  .acg-navigation__content {
    width: 100%;
  }
}

@media screen and (max-width: 650px) {
  .acg-navigation__content {
    .nav-link-ul {
      padding: 0 5px;
    }
    .nav-link-item {
      margin: 0 5px;
    }
    .link {
      padding: 0 10px;
    }
  }
}
</style>