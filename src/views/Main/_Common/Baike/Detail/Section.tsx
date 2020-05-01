import Vue, { RenderContext, CreateElement } from 'vue'

function renderTable(data: any[], style?: string) {
  return <table class="acg-baike-table"></table>
}

function renderContent(h: CreateElement, item: Acgcon.BaikeSectionItem) {
  const data: Record<string, any> = {
    class: `acg-baike-${item.type}`,
    style: item.style
  }
  switch (item.type) {
    case 'text':
      return item.data
        .split('\n')
        .map((text: string) => <p {...data}>{text}</p>)
    case 'html':
      data.domProps = { innerHTML: item.data }
      return <div {...data}></div>
    case 'table':
      return renderTable(item.data, item.style)
  }
}

export default Vue.extend({
  name: 'AcgBaikeSection',
  functional: true,
  render(h, ctx: RenderContext<Record<string, any>>) {
    const { title, list } = ctx.props

    return (
      <acg-title-card title={title}>
        {list.map((item: Acgcon.BaikeSectionItem) => renderContent(h, item))}
      </acg-title-card>
    )
  }
})
