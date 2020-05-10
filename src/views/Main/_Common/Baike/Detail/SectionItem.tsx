import Vue, { RenderContext, CreateElement } from 'vue'
import { VNodeData } from 'vue/types/umd'

function renderText(h: CreateElement, content: string) {
  return content.split('\n').map((text: string) => <p>{text}</p>)
}

function renderTable(
  h: CreateElement,
  item: Acgcon.BaikeSectionTable,
  base: Record<string, any>
) {
  return <table class="acg-baike-table" {...base}></table>
}

function renderImage(h: CreateElement, base: Record<string, any>) {
  return <mz-image {...base} />
}

function renderLR(
  h: CreateElement,
  item: Acgcon.BaikeSectionLeftRight,
  base: Record<string, any>
) {
  const { left, right } = item

  return (
    <div class="d-flex" {...base}>
      {renderContent(h, left, { staticStyle: { flex: '1 1 auto' } })}
      {renderContent(h, right, { staticStyle: { flex: '0 0 auto' } })}
    </div>
  )
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
      return renderTable(h, item, base)
    case 'image':
      base.props = { src: item.data }
      return renderImage(h, base)
    case 'left-right':
      return renderLR(h, item, base)
    default:
      return <div class="acg-baike-compile-error"></div>
  }
}

export default Vue.extend({
  name: 'AcgBaikeSectionItem',
  functional: true,
  render(h, ctx: RenderContext<Record<string, any>>) {
    let { type = 'text', data = '', style, left, right } = ctx.props
    if (!data && ctx.slots().default) {
      data = ctx.slots().default[0].text
    }

    return renderContent(h, { type, data, style, left, right }, ctx.data)
  }
})
