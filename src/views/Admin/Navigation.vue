<template>
  <mz-navigation :data="data"
    class="admin-navigation">
  </mz-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AdminNavigation extends Vue {
  data = [
    {
      title: '筛选项管理',
      icon: 'pricetags-outline',
      to: { name: 'AdminFilter' }
    },
    {
      title: '缓存管理',
      icon: 'file-tray-stacked-outline',
      to: { name: 'AdminCache' }
    },
    {
      title: '资讯管理',
      icon: 'newspaper-outline',
      to: { name: 'AdminInformation' }
    },
    {
      title: '站内公告',
      icon: 'globe-outline',
      to: { name: 'AdminNotice' }
    }
    // {
    //   title: '爬虫管理',
    //   icon: 'bug-outline',
    //   to: { name: 'adminCrawler' }
    // }
  ]
}
</script>

<style lang="scss">
</style>
