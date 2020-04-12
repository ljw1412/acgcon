<template>
  <div class="acg-baike-detail">
    <acg-navigation></acg-navigation>
    <baike-info :info="info"></baike-info>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import AcgNavigation from '@/components/AcgNavigation/index.vue'
import BaikeInfo from './Info.vue'

@Component({ components: { AcgNavigation, BaikeInfo } })
export default class AcgBaikeDetail extends AcgVue {
  info: Acgcon.BaikeItem = {
    _id: 1,
    title: '关于我转生变成史莱姆这档事',
    author: '8bit',
    cover:
      'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3075428487,1084342510&fm=58&s=65F61AC6426290FC9548141A03001010',
    desc:
      '史莱姆生活，开始了。上班族的三上悟在道路上被歹徒给刺杀身亡后，回过神来发现自己转生到了异世界。不过，自己居然是“史莱姆”！他在得到利姆鲁这个名字后开始了自己的史莱姆人生，随着与各个种族相处交流的过程中，他定下了一个目标——那就是“建立一个任何种族都能愉快地一起生活的国家”！',
    tags: [{ name: '2019' }, { name: '异世界' }]
  }
}
</script>

<style lang="scss">
.acg-baike-detail {
  position: relative;
  > .acg-navigation {
    position: absolute;
    height: 50px;
    z-index: 10;
  }
}
</style>
