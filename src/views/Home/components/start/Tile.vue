<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { RawLocation } from 'vue-router'

@Component
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
    return <div {...data}>{this.$slots.default}</div>
  }
}
</script>

<style lang="scss">
.start-tile {
  display: inline-block;
  width: 192px;
  height: 192px;
  margin-bottom: 16px;
  font-size: 16px;
  background-color: #ffffff;
  &--h2 {
    height: 400px;
  }
  &--w2 {
    width: 400px;
  }
}
</style>