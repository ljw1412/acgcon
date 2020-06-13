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
    const props = ctx.props as Record<string, any>
    return (
      <div class={['acg-base-layout', { 'is-dense': props.dense }]}>
        {baseType.map(name =>
          createSlotInWrapper(h, ctx.slots()[name], {
            class: `acg-base-layout__${name}`
          })
        )}
      </div>
    )
  }
})
