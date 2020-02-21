<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
@Component
export default class StartTile extends Vue {
  @Prop(Number)
  readonly w!: number
  @Prop(Number)
  readonly h!: number

  render(h: CreateElement) {
    const data = {
      class: [
        'start-tile',
        {
          'start-tile--h2': this.h === 2,
          'start-tile--w2': this.w === 2
        }
      ]
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