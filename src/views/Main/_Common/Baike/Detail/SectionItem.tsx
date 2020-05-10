import Vue, { RenderContext, CreateElement, VNodeData } from 'vue'
import { parseStyleText } from '@/utils/vue-helper'
import { only } from '@/utils/object'

type SectionTypes = keyof Acgcon.BaikeSectionItemTypeMap

function getFactory(h: CreateElement) {
  const factory = {
    text: ({ data, style }: Acgcon.BaikeSectionText) => {
      return data.split('\n').map((text: string) => <p style={style}>{text}</p>)
    },
    html: ({ data, style }: Acgcon.BaikeSectionText) => {
      return <div domProps={{ innerHTML: data }} style={style}></div>
    },
    table: ({ data, style }: Acgcon.BaikeSectionTable) => {
      return <table style={style}></table>
    },
    image: ({ data, style }: Acgcon.BaikeSectionImage) => {
      return <mz-image src={data} style={style} />
    },
    'left-right': ({ left, right, style }: Acgcon.BaikeSectionLeftRight) => {
      return (
        <div class="acg-baike-left-right__inner" style={style}>
          {getVnode(h, factory, left)}
          {getVnode(h, factory, right)}
        </div>
      )
    }
  }
  return factory
}

function getContent(
  factory: Record<SectionTypes, (item: Acgcon.BaikeSectionItem) => {}>,
  type: SectionTypes,
  item: Acgcon.BaikeSectionItem
) {
  const render = factory[type]
  return render(item)
}

function getItem(ctx: RenderContext<Record<string, any>>) {
  const item = only(ctx.props, 'type data style left right')
  if (!item.type) item.type = 'text'
  if (!item.data && ctx.slots().default) {
    item.data = ctx.slots().default[0].text
  }
  return item as Acgcon.BaikeSectionItem
}

function getVnode(
  h: CreateElement,
  factory: any,
  item: Acgcon.BaikeSectionItem,
  ctx?: RenderContext<Record<string, any>>
) {
  const wrapperData: Record<string, any> = {
    class: [`acg-baike-${item.type}`],
    style: [parseStyleText(item.style)]
  }
  if (item.type === 'image') wrapperData.style = []
  if (ctx) {
    const { staticClass, staticStyle } = ctx.data
    wrapperData.class.push(staticClass)
    wrapperData.style.push(staticStyle)
  }

  return <div {...wrapperData}>{getContent(factory, item.type, item)}</div>
}

export default Vue.extend({
  name: 'AcgBaikeSectionItem',
  functional: true,
  render(h, ctx: RenderContext<Record<string, any>>) {
    const factory = getFactory(h)
    const item = getItem(ctx)

    return getVnode(h, factory, item, ctx)
  }
})
