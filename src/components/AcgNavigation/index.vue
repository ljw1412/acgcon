<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import NavLink from '@/components/AcgHeader/NavLink.vue'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'
import { getNavByAcgType } from '@/configs/index'
import { CreateElement } from 'vue'

@Component({ components: { NavLink, AcgUserAvatar } })
export default class AcgNavigation extends Vue {
  @Prop(Boolean)
  readonly fixable!: boolean
  @Prop(String)
  readonly offsetTop!: string

  isFixed = false

  get acgType() {
    return this.$route.params.acgType as Acgcon.Types
  }

  get navList() {
    return getNavByAcgType(this.acgType)
  }

  renderNavigation() {
    return (
      <div class="acg-navigation">
        <div class="acg-navigation__content acg-media-container d-flex align-items-center justify-content-between">
          <nav-link links={this.navList}></nav-link>
          <div class="acg-navigation__right">
            <acg-user-avatar
              v-show={this.isFixed}
              size={60}
              inner-info
            ></acg-user-avatar>
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
      style: { marginTop: this.offsetTop },
      on: {
        change: (isFixed: boolean) => {
          this.isFixed = isFixed
        }
      }
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
  overflow-x: auto;

  &__content {
    height: 100%;
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
}

.mz-fixed-section.is-sticky {
  .acg-navigation {
    background-image: none;
    background-color: $card-bg;
    box-shadow: 0 4px 6px $border-color;
    transition: background-color 0.2s;

    .link {
      color: $color-text-primary;
    }
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