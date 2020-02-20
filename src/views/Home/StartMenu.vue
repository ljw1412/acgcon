<template>
  <div class="start-menu">
    <div v-for="(rows,i) of columns"
      :key="i"
      class="start-menu__column">
      <start-tile v-for="(item,j) of rows"
        :w="item.w"
        :h="item.h"
        :key="`${i}-${j}`"></start-tile>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StartTile from './StartTile.vue'
@Component({
  components: {
    StartTile
  }
})
export default class StartMenu extends Vue {
  columns = [
    [
      { w: 2, h: 2 },
      { w: 2, h: 1 }
    ],
    [
      { w: 1, h: 1 },
      { w: 1, h: 1 },
      { w: 2, h: 1 },
      { w: 2, h: 1 }
    ],
    [
      { w: 2, h: 1 },
      { w: 2, h: 1 },
      { w: 2, h: 1 }
    ],
    [
      { w: 1, h: 1 },
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