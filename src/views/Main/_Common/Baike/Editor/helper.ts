export interface MenuItem {
  title: string
  icon: string
  value: string
  items?: Acgcon.BaikeSectionItem[]
}

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

export function getBaseMenu(): MenuItem[] {
  return [{ title: '核心数据', icon: 'earth-outline', value: 'core' }]
}

export function createSection(): MenuItem {
  return {
    title: '自定义模块',
    icon: 'cube-outline',
    value: Math.random() + '',
    items: []
  }
}

export const typeNameMap = {
  text: '文字',
  image: '图片',
  'left-right': '左右布局',
  table: '表格',
  html: 'HTML'
}
