<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement, VNodeData } from 'vue'
import { slugify } from 'transliteration'

@Component
export default class AcgTitleCard extends Vue {
  @Prop(String)
  readonly title!: string
  @Prop({ type: Object, default: () => ({}) })
  readonly card!: Record<string, any>

  renderHeader() {
    if (!this.$slots.title && !this.title) return

    const useTitle = !!this.title

    const data: VNodeData = {
      class: 'acg-title-card__header flex-shrink-0 mb-8',
      props: {
        level: 4,
        title: this.title,
        anchor: useTitle ? 'mz-anchor-symbol' : false,
        invisibleAnchor: useTitle
      },
      attrs: { id: slugify(this.title || '') || undefined }
    }

    return (
      <mz-heading {...data}>
        {this.$slots.title || (
          <span class="acg-title-card__title lh-24 px-8 font-weight-normal">
            {this.title}
          </span>
        )}
      </mz-heading>
    )
  }

  render(h: CreateElement) {
    return (
      <div class="acg-title-card position-relative d-flex flex-column">
        {this.renderHeader()}
        <mz-card {...{ props: this.card }}>{this.$slots.default}</mz-card>
      </div>
    )
  }
}
</script>

<style lang="scss">
.acg-title-card {
  &__title {
    color: $color-text-primary;
    text-shadow: 0 0 16px $primary;
  }

  > .mz-card {
    flex: 1 0 auto;
    padding: 20px 40px;
    border-radius: 4px;
  }
}
</style>
