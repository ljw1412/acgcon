import { Location } from 'vue-router'

export const pageHomeList = [
  {
    label: 'ACG大本营',
    to: { name: 'home' }
  },
  {
    label: '动画',
    to: { name: 'subHome', params: { acgType: 'animation' } }
  },
  {
    label: '漫画',
    to: { name: 'subHome', params: { acgType: 'comic' } }
  },
  {
    label: '游戏',
    to: { name: 'subHome', params: { acgType: 'game' } }
  }
]

const navMap: Record<string, Acgcon.NavigationItem[]> = {
  common: [
    {
      label: '资讯',
      to: { name: 'information' }
    }
  ],
  animation: [
    {
      label: '番剧',
      type: 'baike',
      to: { name: 'baike' }
    },
    {
      label: '声优',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'va' } }
    },
    {
      label: '角色',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'character' } }
    },
    {
      label: '监督',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'director' } }
    },
    {
      label: '公司',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'company' } }
    }
  ],
  comic: [
    {
      label: '漫画',
      type: 'baike',
      to: { name: 'baike' }
    },
    {
      label: '作者',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'author' } }
    },
    {
      label: '杂志',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'magazine' } }
    },
    {
      label: '公司',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'company' } }
    }
  ],
  game: [
    {
      label: '游戏',
      type: 'baike',
      to: { name: 'baike' }
    },
    {
      label: '公司',
      type: 'baike',
      to: { name: 'baike', params: { subType: 'company' } }
    }
  ]
}

export function getNavByAcgType(
  acgType: Acgcon.Types,
  hasHome: boolean = true
) {
  const list: Acgcon.NavigationItem[] = []
  if (hasHome) {
    list.unshift({
      label: '首页',
      to: { name: 'subHome', params: { acgType } }
    })
  }
  return list.concat([...navMap.common, ...navMap[acgType]])
}

export function getSubTypesByAcgType(acgType: Acgcon.Types) {
  let navList = getNavByAcgType(acgType)
  navList = navList.filter(item => item.type === 'baike')
  return navList.map(item => {
    const params = (item.to as Location).params
    return { label: item.label, value: params ? params.subType : acgType }
  })
}
