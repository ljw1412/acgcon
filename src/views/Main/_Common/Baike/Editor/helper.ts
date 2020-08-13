export interface MenuItem {
  title: string
  icon: string
  value: string
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

export function createSection() {
  return {
    title: '自定义模块',
    icon: 'cube-outline',
    value: Math.random() + '',
    items: []
  }
}

export function createSectionItem(type: string) {
  switch (type) {
    case 'left-right':
      return { type, left: {}, right: {} }
    case 'text':
    case 'image':
    case 'html':
      return { type, data: '', style: '' }
    case 'table':
      return { type, data: [] }
  }
}
