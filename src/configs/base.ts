import { Location } from 'vue-router'

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
      to: { name: 'baike', params: { baikeType: 'va' } }
    },
    {
      label: '角色',
      type: 'baike',
      to: { name: 'baike', params: { baikeType: 'character' } }
    },
    {
      label: '监督',
      type: 'baike',
      to: { name: 'baike', params: { baikeType: 'director' } }
    },
    {
      label: '公司',
      type: 'baike',
      to: { name: 'baike', params: { baikeType: 'company' } }
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
      to: { name: 'baike', params: { baikeType: 'author' } }
    },
    {
      label: '杂志',
      type: 'baike',
      to: { name: 'baike', params: { baikeType: 'magazine' } }
    },
    {
      label: '公司',
      type: 'baike',
      to: { name: 'baike', params: { baikeType: 'company' } }
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
      to: { name: 'baike', params: { baikeType: 'company' } }
    }
  ]
}

export function getNavByAcgType(acgType: Acgcon.Types) {
  return [
    { label: '首页', to: { name: 'subHome', params: { acgType } } },
    ...navMap.common,
    ...navMap[acgType]
  ]
}

export function getBaikeTypesByAcgType(acgType: Acgcon.Types) {
  let navList = getNavByAcgType(acgType)
  navList = navList.filter(item => item.type === 'baike')
  return navList.map(item => {
    const params = (item.to as Location).params
    return { label: item.label, value: params ? params.baikeType : acgType }
  })
}
