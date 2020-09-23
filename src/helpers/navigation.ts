import { Location } from 'vue-router'

export const pageHomeList = [
  {
    label: 'ACG大本营',
    to: { name: 'Home' }
  },
  {
    label: '动画',
    to: { name: 'SubHome', params: { acgType: 'animation' } }
  },
  {
    label: '漫画',
    to: { name: 'SubHome', params: { acgType: 'comic' } }
  },
  {
    label: '游戏',
    to: { name: 'SubHome', params: { acgType: 'game' } }
  }
]

const navMap: Record<string, Acgcon.NavigationItem[]> = {
  common: [
    {
      label: '资讯',
      type: 'information',
      to: { name: 'Information' }
    }
  ],
  animation: [
    {
      label: '番剧',
      type: 'baike_animation',
      to: { name: 'Baike' }
    },
    {
      label: '声优',
      type: 'baike_va',
      to: { name: 'Baike', params: { subType: 'va' } }
    },
    {
      label: '角色',
      type: 'baike_character',
      to: { name: 'Baike', params: { subType: 'character' } }
    },
    {
      label: '监督',
      type: 'baike_director',
      to: { name: 'Baike', params: { subType: 'director' } }
    },
    {
      label: '公司',
      type: 'baike_company',
      to: { name: 'Baike', params: { subType: 'company' } }
    }
  ],
  comic: [
    {
      label: '漫画',
      type: 'baike_comic',
      to: { name: 'Baike' }
    },
    {
      label: '作者',
      type: 'baike_author',
      to: { name: 'Baike', params: { subType: 'author' } }
    },
    {
      label: '杂志',
      type: 'baike_magazine',
      to: { name: 'Baike', params: { subType: 'magazine' } }
    },
    {
      label: '公司',
      type: 'baike_company',
      to: { name: 'Baike', params: { subType: 'company' } }
    }
  ],
  game: [
    {
      label: '游戏',
      type: 'baike_game',
      to: { name: 'Baike' }
    },
    {
      label: '公司',
      type: 'baike_company',
      to: { name: 'Baike', params: { subType: 'company' } }
    }
  ]
}

/**
 * 根据acg类型获取导航列表
 * @param acgType acg类型
 * @param hasHome 是否包含首页
 */
export function getNavByAcgType(acgType: Acgcon.Types, hasHome = true) {
  const list: Acgcon.NavigationItem[] = []
  if (hasHome) {
    list.unshift({
      label: '首页',
      type: 'home',
      to: { name: 'SubHome', params: { acgType } }
    })
  }
  return list.concat([...navMap.common, ...navMap[acgType]])
}

/**
 * 根据acg类型获取子类型列表
 * @param acgType acg类型
 */
export function getSubTypesByAcgType(acgType: Acgcon.Types) {
  let navList = getNavByAcgType(acgType, false)
  navList = navList.filter(item => item.type?.includes('baike_'))
  return navList.map(item => {
    const params = (item.to as Location).params
    return { label: item.label, value: params ? params.subType : acgType }
  })
}
