export function getBlankInfo(): Acgcon.BaikeData {
  return {
    _id: undefined,
    title: '',
    author: '',
    cover: '',
    desc: '',
    tags: [],
    basic: []
  }
}

export function getBaseMenu(): Acgcon.BaikeSection[] {
  return [{ title: '核心数据', icon: 'earth-outline', _id: 'core' }]
}

export function createSection(): Acgcon.BaikeSection {
  return {
    _id: 'new_' + Math.random(),
    title: '自定义模块',
    icon: 'cube-outline',
    items: []
  }
}

export const sectionItemTypeList = [
  { title: '文字', icon: 'text-outline', type: 'text' },
  { title: '图片', icon: 'image-outline', type: 'image' },
  { title: '左右布局', icon: 'book-outline', type: 'left-right' },
  { title: '表格', icon: 'grid-outline', type: 'table' },
  { title: 'HTML', icon: 'code-working-outline', type: 'html' }
]

export const typeNameMap = sectionItemTypeList.reduce((obj, item) => {
  obj[item.type] = item.title
  return obj
}, {} as Record<string, string>)

export const typeIconMap = sectionItemTypeList.reduce((obj, item) => {
  obj[item.type] = item.icon
  return obj
}, {} as Record<string, string>)
