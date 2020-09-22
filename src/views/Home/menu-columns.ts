export default [
  [
    { w: 2, h: 2, component: 'MenuCarousel' },
    { w: 2, h: 1 }
  ],
  [
    {
      w: 2,
      h: 1,
      to: { name: 'SubHome', params: { acgType: 'animation' } },
      component: 'StartEntrance',
      props: { title: '动画' }
    },
    {
      w: 2,
      h: 1,
      to: { name: 'SubHome', params: { acgType: 'comic' } },
      component: 'StartEntrance',
      props: { title: '漫画' }
    },
    {
      w: 2,
      h: 1,
      to: { name: 'SubHome', params: { acgType: 'game' } },
      component: 'StartEntrance',
      props: { title: '游戏' }
    }
  ],
  [
    // { w: 1, h: 1 },
    // { w: 1, h: 1 },
    // { w: 2, h: 1 },
    // { w: 2, h: 1 }
    { w: 2, h: 3, component: 'MenuInformation' }
  ],
  [
    {
      w: 1,
      h: 1,
      component: 'StartBigTitle',
      props: { html: '百科<br/>更新' }
    },
    { w: 1, h: 1 },
    { w: 1, h: 1 },
    { w: 1, h: 1 },
    { w: 1, h: 1 },
    { w: 1, h: 1 }
  ]
]
