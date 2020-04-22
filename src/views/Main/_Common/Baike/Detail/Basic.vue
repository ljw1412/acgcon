<template>
  <mz-card class="acg-baike-basic">
    <ul class="acg-baike-basic-block">
      <li class="acg-baike-basic-item"
        v-for="(item, index) of basic"
        :key="index">
        <div class="acg-baike-basic-item__name">{{item.name}}</div>
        <div class="acg-baike-basic-item__value">{{item.value}}</div>
      </li>
    </ul>
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgBaikeBasic extends Vue {
  basic = [
    { name: '中文名', value: '关于我转生变成史莱姆这档事' },
    { name: '原版名称', value: '転生したらスライムだった件' },
    { name: '其他名称', value: 'That Time I Got Reincarnated as a Slime' },
    { name: '动画制作', value: '8bit' },
    { name: '集    数', value: '全30话（23话正篇+1话外传+1话闲谈+5话OAD）' },
    { name: '类    型', value: '穿越，转生，冒险' },
    { name: '地    区', value: '日本' },
    { name: '原    作', value: '川上泰树、伏濑、みっつばー' },
    { name: '导    演', value: '菊地康仁（第1期），中山敦史（第2期）' },
    { name: '剧    本', value: '笔安一幸' },
    { name: '音    乐', value: 'Elements Garden' },
    { name: '首播电视台', value: 'TOKYO MX、BS11' },
    { name: '其他电视台', value: 'tvk MBS 爱知电视台 北海道电视台 群马电视台' },
    { name: '网络播放', value: '爱奇艺 腾讯视频 bilibili 芒果TV' },
    { name: '出    品', value: '转生史莱姆制作委员会' },
    { name: '代理发行', value: '木棉花（中国）' },
    { name: '1st播出期间', value: '2018年10月1日-2019年3月25日' },
    { name: '2nd播出期间', value: '2020年10月-' },
    {
      name: '主要配音',
      value: '冈咲美保，丰口惠美，前野智昭，花守由美里，古川慎，千本木彩花'
    }
  ]
}
</script>

<style lang="scss">
.acg-baike-basic {
  position: relative;
  max-width: $screen-width-lg;
  margin: 0 auto;
}

.acg-baike-basic-block {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.acg-baike-basic-item {
  display: flex;
  width: 33.33%;
  font-size: 14px;
  margin-bottom: 4px;
  &__name {
    flex-shrink: 0;
    width: 100px;
  }
  &__value {
    padding-right: 10px;
  }
}

@media screen and (max-width: $screen-width-md) and (min-width: $screen-width-sm+1) {
  .acg-baike-basic-item {
    width: 50%;
  }
}

@media screen and (max-width: $screen-width-sm) {
  .acg-baike-basic-item {
    width: 100%;
  }
}
</style>
