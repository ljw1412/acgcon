<template>
  <div class="acg-baike-detail">
    <baike-header :info="info"></baike-header>
    <baike-info :info="info"></baike-info>
    <baike-basic :basic="info.basic"></baike-basic>
  </div>
</template>

<script lang="ts">
import './index.scss'
import { Component, Vue } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import AcgNavigation from '@/components/AcgNavigation/index.vue'
import BaikeHeader from './Header.vue'
import BaikeInfo from './Info.vue'
import BaikeBasic from './Basic.vue'

@Component({
  components: { AcgNavigation, BaikeHeader, BaikeInfo, BaikeBasic }
})
export default class AcgBaikeDetail extends AcgVue {
  info: Acgcon.BaikeData = {
    _id: 1,
    title: '关于我转生变成史莱姆这档事',
    author: '8bit',
    cover:
      'https://bkimg.cdn.bcebos.com/pic/34fae6cd7b899e510fb33c7fdbefce33c895d143a70a?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
    desc:
      '史莱姆生活，开始了。上班族的三上悟在道路上被歹徒给刺杀身亡后，回过神来发现自己转生到了异世界。不过，自己居然是“史莱姆”！他在得到利姆鲁这个名字后开始了自己的史莱姆人生，随着与各个种族相处交流的过程中，他定下了一个目标——那就是“建立一个任何种族都能愉快地一起生活的国家”！',
    tags: [{ name: '2019' }, { name: '异世界' }],
    basic: [
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
      {
        name: '其他电视台',
        value: 'tvk MBS 爱知电视台 北海道电视台 群马电视台'
      },
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
}
</script>