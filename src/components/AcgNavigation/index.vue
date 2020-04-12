<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import NavLink from '@/components/AcgHeader/NavLink.vue'
import { getNavByAcgType } from '@/configs/index'
import { CreateElement } from 'vue'

@Component({ components: { NavLink } })
export default class AcgNavigation extends Vue {
  @Prop(Boolean)
  readonly fixable!: boolean
  @Prop(String)
  readonly offsetTop!: string

  get acgType() {
    return this.$route.params.acgType as Acgcon.Types
  }

  get navList() {
    return getNavByAcgType(this.acgType)
  }

  renderNavigation() {
    return (
      <div class="acg-navigation">
        <div class="acg-navigation__content flex-center-space-between">
          <nav-link links={this.navList}></nav-link>
          <div class="acg-navigation__right">
            <div class="acg-navigation__user"></div>
          </div>
        </div>
      </div>
    )
  }

  render(h: CreateElement) {
    const navigationVNode = this.renderNavigation()
    if (!this.fixable) return navigationVNode
    const data = {
      class: ['acg-navigation-wrapper'],
      props: { sticky: true, placeholder: true },
      style: { marginTop: this.offsetTop }
    }
    return <mz-fixed-section {...data}>{navigationVNode}</mz-fixed-section>
  }
}
</script>

<style lang="scss">
.acg-navigation {
  height: 60px;
  width: 100%;
  line-height: 30px;
  box-sizing: border-box;

  &__content {
    height: 100%;
    max-width: $screen-width-lg;
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
    background-image: none;
    background-color: #ffffff;
    box-shadow: 0 -1px 5px rgba(#000, 0.3);
    transition: all 0.2s;
    &__user {
      display: block;
    }

    .link {
      color: #333333;
    }
  }
}

@media screen and (max-width: $screen-width-lg) {
  .acg-navigation__content {
    width: 100%;
  }
}

@media screen and (max-width: $screen-width-sm) {
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