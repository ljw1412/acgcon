import './BaseLayout.scss'
import Vue, { VNodeData, CreateElement } from 'vue'

const baseType = ['top', 'action', 'default', 'bottom']

function createSlotInWrapper(
  h: CreateElement,
  node: any,
  wrapperData?: VNodeData
) {
  return node ? <div {...wrapperData}>{node}</div> : null
}

export default Vue.extend({
  name: 'AcgBaseLayout',
  functional: true,
  render(h, ctx) {
    const { class: clazz, staticClass, style, staticStyle } = ctx.data
    const props = ctx.props as Record<string, any>
    const data = {
      class: [
        'acg-base-layout',
        { 'is-dense': props.dense },
        clazz,
        staticClass
      ],
      style: [style, staticStyle]
    }
    return (
      <div {...data}>
        {baseType.map(name =>
          createSlotInWrapper(h, ctx.slots()[name], {
            class: `acg-base-layout__${name}`
          })
        )}
      </div>
    )
  }
})
