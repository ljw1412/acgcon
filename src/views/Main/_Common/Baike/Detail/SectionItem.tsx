import Vue, { RenderContext, CreateElement } from 'vue'
import { VNodeData } from 'vue/types/umd'

function renderText(h: CreateElement, content: string) {
  return content.split('\n').map((text: string) => <p>{text}</p>)
}

function renderTable(data: any[], style?: string) {
  return <table class="acg-baike-table"></table>
}

function renderContent(
  h: CreateElement,
  item: Acgcon.BaikeSectionItem,
  { staticClass, staticStyle }: VNodeData
) {
  const base: Record<string, any> = {
    class: [`acg-baike-${item.type}`, staticClass],
    style: [item.style, staticStyle]
  }
  switch (item.type) {
    case 'text':
      return <div {...base}>{renderText(h, item.data)}</div>
    case 'html':
      base.domProps = { innerHTML: item.data }
      return <div {...base}></div>
    case 'table':
      return renderTable(item.data, item.style)
    default:
      return <div class="acg-baike-compile-error"></div>
  }
}

export default Vue.extend({
  name: 'AcgBaikeSectionItem',
  functional: true,
  render(h, ctx: RenderContext<Record<string, any>>) {
    let { type = 'text', data = '', style } = ctx.props
    if (!data && ctx.slots().default) {
      data = ctx.slots().default[0].text
    }

    return renderContent(h, { type, data, style }, ctx.data)
  }
})
