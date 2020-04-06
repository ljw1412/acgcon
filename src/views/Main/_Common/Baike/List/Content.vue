<template>
  <div class="acg-baike-content">
    <div v-for="item of list"
      class="acg-baike-content__item"
      :key="item._id">
      <mz-card :elevation="0">
        <mz-image :src="item.cover"
          fit="cover"
          position="center"
          class="baike-cover"></mz-image>

        <div class="baike-info">
          <mz-heading class="baike-info__title"
            :level="7">{{item.title}}</mz-heading>
          <div class="baike-info__tags">
            <mz-tag v-for="tag of item.tags"
              size="small"
              :key="tag">{{tag}}</mz-tag>
          </div>
          <mz-heading class="baike-info__author"
            :level="8">{{item.author}}</mz-heading>
          <mz-heading class="baike-info__desc"
            :level="9">{{item.desc}}</mz-heading>
        </div>
      </mz-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'

@Component
export default class AcgBaikeContent extends AcgVue {
  list = [
    {
      _id: 1,
      title: '关于我转生变成史莱姆这档事',
      author: '8bit',
      cover: '',
      desc:
        '史莱姆生活，开始了。上班族的三上悟在道路上被歹徒给刺杀身亡后，回过神来发现自己转生到了异世界。不过，自己居然是“史莱姆”！他在得到利姆鲁这个名字后开始了自己的史莱姆人生，随着与各个种族相处交流的过程中，他定下了一个目标——那就是“建立一个任何种族都能愉快地一起生活的国家”！',
      tags: ['2019', '异世界']
    },
    {
      _id: 2,
      title: '格莱普尼尔',
      author: 'PINE JAM',
      cover: '',
      desc:
        '学习方面还行，也有朋友。虽然的确是有一点被上天所眷顾着，但还是个普通男子高中生的加贺谷修一，有着可以变身为怪物的这一秘密。并不是那种被世间所惧怕的怪物……而是布偶怪物。他曾经所爱的平稳日常，某一天突然被夺走了…'
    },
    {
      _id: 3,
      title: '博人传 火影忍者新时代',
      author: 'Studio Pierrot',
      cover: '',
      desc:
        '随着和平的到来而走向近代化的木叶隐村。高楼林立，巨大显示屏中播放出影像，连结各区域的电车在村里奔驰。虽说是忍者村，但一般民众也增多，忍者的生存方式也在逐渐改变的这个时代——村子的领袖、第七代火影·漩涡鸣人的儿子博人，进入了培育忍者的学校“忍者学校”。周围的学生们带着“火影的儿子”这样偏见的目光看待博人，但博人凭借天生的破天荒性格将这种小事轻松越过！博人与新的伙伴相遇，他将如何挑战突然发生的神秘事件？在众人心中如疾风般狂奔的“漩涡博人”的物语，现在开始！！'
    },
    { _id: 4 }
  ]
}
</script>

<style lang="scss">
@import '../var.scss';
.acg-baike-content {
  width: calc(100% - #{$filter-width} - 20px);
  transition: width 0.15s linear;
  will-change: width;

  &__item {
    display: inline-flex;
    height: 200px;
    padding-left: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    transition: height 0.15s linear;
    will-change: width, height;
    vertical-align: top;
    .mz-card {
      cursor: pointer;
      display: flex;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.25s;
      overflow: hidden;
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24);
      }
    }

    .baike-cover {
      flex-shrink: 0;
      width: 36%;
      height: 100%;
    }

    .baike-info {
      flex-grow: 1;
      width: 64%;
      padding: 5px 10px;
      box-sizing: border-box;

      &__title {
        @include ellipsis;
        font-weight: 500;
        margin-bottom: 4px;
      }

      &__tags {
        @include ellipsis;
        margin-bottom: 4px;
        .mz-tag + .mz-tag {
          margin-left: 2px;
        }
      }

      &__author {
        @include ellipsis;
        color: $color-text-regular;
        margin-bottom: 4px;
      }

      &__desc {
        @include multi-ellipsis(6);
        color: $color-text-secondary;
      }
    }
  }
}

@media screen and (min-width: 1500px) {
  .acg-baike-content__item {
    width: 33.33%;
    &:nth-child(3n - 2) {
      padding-left: 0;
    }
  }
}

@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .acg-baike-content__item {
    width: 50%;
    height: 240px;
    &:nth-child(2n - 1) {
      padding-left: 0;
    }
  }
}

@media screen and (max-width: 1200px) {
  .acg-baike-content__item {
    width: 100%;
    height: 260px;
    padding-left: 0;
  }
}
</style>
