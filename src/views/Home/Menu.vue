<template>
  <div class="acg-home-menu text-center">
    <div v-for="(rows,i) of columns"
      class="column d-inline-flex justify-content-between flex-wrap text-left align-top"
      :key="i">
      <tile v-for="(item,j) of rows"
        :w="item.w"
        :h="item.h"
        :to="item.to"
        :href="item.href"
        :key="`${i}-${j}`">
        <template v-if="item.component">
          <component :is="item.component"
            v-bind="item.props"></component>
        </template>
      </tile>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tile from './MenuTile.vue'
import MenuInformation from './MenuInformation.vue'
import MenuCarousel from './MenuCarousel.vue'
import menuColumns from './menu-columns'

@Component({ components: { Tile, MenuInformation, MenuCarousel } })
export default class AcgHomeMenu extends Vue {
  columns = menuColumns
}
</script>

<style lang="scss">
.acg-home-menu {
  .column {
    width: 400px;
    & + .column {
      margin-left: 16px;
    }
  }
}
</style>
