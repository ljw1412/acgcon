<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class AcgTitleCard extends Vue {
  @Prop(String)
  readonly title!: string
  @Prop({ type: Object, default: () => ({}) })
  readonly card!: Record<string, any>

  renderHeader() {
    if (!this.$slots.title && !this.title) return
    return (
      <div class="acg-title-card__header">
        {this.$slots.title || (
          <span class="acg-title-card__title">{this.title}</span>
        )}
      </div>
    )
  }

  render(h: CreateElement) {
    return (
      <div class="acg-title-card">
        {this.renderHeader()}
        <mz-card {...{ props: this.card }}>{this.$slots.default}</mz-card>
      </div>
    )
  }
}
</script>

<style lang="scss">
.acg-title-card {
  position: relative;
  display: flex;
  flex-direction: column;

  &__header {
    flex-shrink: 0;
    margin-bottom: 6px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $color-text-primary;
    text-shadow: 0 0 16px $color-primary;
  }

  > .mz-card {
    flex: 1 0 auto;
    padding: 20px 40px;
    border-radius: 4px;
  }
}
</style>
