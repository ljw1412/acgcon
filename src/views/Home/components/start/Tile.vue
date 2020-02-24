<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { RawLocation } from 'vue-router'

@Component({
  provide() {
    return { tile: this }
  }
})
export default class StartTile extends Vue {
  @Prop(Number)
  readonly w!: number
  @Prop(Number)
  readonly h!: number
  @Prop(Boolean)
  readonly pointer!: boolean
  @Prop(Boolean)
  readonly replace!: boolean
  @Prop()
  readonly to!: RawLocation
  @Prop(String)
  readonly href!: string

  render(h: CreateElement) {
    const data = {
      class: [
        'start-tile',
        {
          'start-tile--h2': this.h === 2,
          'start-tile--w2': this.w === 2,
          'is-pointer': this.pointer || this.to || this.href
        }
      ],
      on: {
        click: (e: MouseEvent) => {
          this.$emit('click', e)
          if (this.to) {
            this.$router[this.replace ? 'replace' : 'push'](this.to)
          } else if (this.href) {
            this.replace
              ? location.replace(this.href)
              : (location.href = this.href)
          }
        }
      }
    }
    return (
      <div class="start-tile-wrapper">
        <div {...data}>{this.$slots.default}</div>
      </div>
    )
  }
}
</script>

<style lang="scss">
.start-tile-wrapper {
  display: inline-block;
  margin-bottom: 16px;
}

.start-tile {
  width: 192px;
  height: 192px;
  font-size: 16px;
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  &__content {
    width: 100%;
    height: 100%;
  }
  &--h2 {
    height: 400px;
  }
  &--w2 {
    width: 400px;
  }
}
</style>