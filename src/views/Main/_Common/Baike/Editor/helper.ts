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

export function createSection(title: string = ''): Acgcon.BaikeSection {
  return { title, items: [] }
}
