<template>
  <div class="start-menu">
    <div v-for="(rows,i) of columns"
      :key="i"
      class="start-menu__column">
      <start-tile v-for="(item,j) of rows"
        :w="item.w"
        :h="item.h"
        :to="item.to"
        :href="item.href"
        :key="`${i}-${j}`">
        <template v-if="item.component">
          <component :is="item.component"
            v-bind="item.props"></component>
        </template>
      </start-tile>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StartTile from './Tile.vue'
import StartEntrance from './Entrance.vue'
import StartBigTitle from './BigTitle.vue'
import StartCarousel from './Carousel.vue'
import StartInformation from './information.vue'

@Component({ components: { StartTile } })
export default class StartMenu extends Vue {
  columns = [
    [
      { w: 2, h: 2, component: StartCarousel },
      { w: 2, h: 1 }
    ],
    [
      {
        w: 2,
        h: 1,
        to: { name: 'subHome', params: { acgType: 'animation' } },
        component: StartEntrance,
        props: { title: '动画' }
      },
      {
        w: 2,
        h: 1,
        to: { name: 'subHome', params: { acgType: 'comic' } },
        component: StartEntrance,
        props: { title: '漫画' }
      },
      {
        w: 2,
        h: 1,
        to: { name: 'subHome', params: { acgType: 'game' } },
        component: StartEntrance,
        props: { title: '游戏' }
      }
    ],
    [
      // { w: 1, h: 1 },
      // { w: 1, h: 1 },
      // { w: 2, h: 1 },
      // { w: 2, h: 1 }
      { w: 2, h: 3, component: StartInformation }
    ],
    [
      {
        w: 1,
        h: 1,
        component: StartBigTitle,
        props: { html: '百科<br/>更新' }
      },
      { w: 1, h: 1 },
      { w: 1, h: 1 },
      { w: 1, h: 1 },
      { w: 1, h: 1 },
      { w: 1, h: 1 }
    ]
  ]
}
</script>

<style lang="scss">
.start-menu {
  text-align: center;

  &__column {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 400px;
    text-align: left;
    vertical-align: top;
    & + & {
      margin-left: 16px;
    }
  }
}
</style>