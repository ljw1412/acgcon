interface AcgTypeItem {
  value: string
  icon: string
  label: string
}

const acgTypeList: AcgTypeItem[] = [
  { value: 'animation', icon: 'film', label: '动画' },
  { value: 'comic', icon: 'book', label: '漫画' },
  { value: 'game', icon: 'game-controller', label: '游戏' }
]

function getMapOfAcgType(key: keyof AcgTypeItem) {
  return acgTypeList.reduce((obj, item) => {
    obj[item.value] = item[key]
    return obj
  }, {} as Record<string, string>)
}

export const acgTypeIconMap = getMapOfAcgType('icon')

export const acgTypeNameMap = getMapOfAcgType('label')

export function getAcgTypeList(hasAll = false) {
  if (!hasAll) return acgTypeList
  return [{ value: '', icon: '', label: '全部类型' }].concat(acgTypeList)
}
