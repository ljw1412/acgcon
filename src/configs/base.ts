const navMap: Record<string, Acgcon.NavigationItem[]> = {
  common: [
    {
      label: '资讯',
      to: ''
    }
  ],
  animation: [
    {
      label: '番剧',
      to: { name: 'baike' }
    },
    {
      label: '声优',
      to: ''
    },
    {
      label: '监督',
      to: ''
    },
    {
      label: '公司',
      to: ''
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
