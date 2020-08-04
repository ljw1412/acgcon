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
