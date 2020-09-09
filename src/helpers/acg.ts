export const acgType = {
  animation: { icon: 'film', name: '动画' },
  comic: { icon: 'book', name: '漫画' },
  game: { icon: 'game-controller', name: '游戏' }
}

export const acgTypeIconMap = Object.keys(acgType).reduce((obj, key) => {
  obj[key] = acgType[key as keyof typeof acgType].icon
  return obj
}, {} as Record<string, string>)

export const acgTypeNameMap = Object.keys(acgType).reduce((obj, key) => {
  obj[key] = acgType[key as keyof typeof acgType].name
  return obj
}, {} as Record<string, string>)
