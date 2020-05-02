import Vue, { RenderContext, CreateElement } from 'vue'
import BaikeSectionItem from './SectionItem'

function renderContent(h: CreateElement, item: Acgcon.BaikeSectionItem) {
  return h(BaikeSectionItem, { props: item })
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
