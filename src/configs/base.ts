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
      to: { name: 'baike' }
    },
    {
      label: '声优',
      to: { name: 'baike', params: { baikeType: 'va' } }
    },
    {
      label: '监督',
      to: { name: 'baike', params: { baikeType: 'director' } }
    },
    {
      label: '公司',
      to: { name: 'baike', params: { baikeType: 'company' } }
    }
  ],
  comic: [],
  game: []
}

export function getNavByAcgType(acgType: Acgcon.Types) {
  return [
    { label: '首页', to: { name: 'subHome', params: { acgType } } },
    ...navMap.common,
    ...navMap[acgType]
  ]
}
