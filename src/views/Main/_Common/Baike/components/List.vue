<template>
  <div class="acg-baike-list">
    <mz-heading class="acg-baike-list__title"
      :level="7">
      <span>标题</span>
      <div class="acg-baike-list__switch-layout">
        <mz-icon name="md-list"
          class="is-pointer"
          :class="{active:displayMode==='list'}"
          @click="displayMode = 'list'"></mz-icon>
        <mz-icon name="md-grid"
          class="is-pointer"
          :class="{active:displayMode==='grid'}"
          @click="displayMode = 'grid'"></mz-icon>
      </div>
    </mz-heading>
    <mz-state :value="state">
      <template #loading>
        正在加载中……
      </template>
      <template #list>
        <ul class="acg-baike-list-ul"
          :class="`acg-baike-list-ul--${displayMode}`">
          <baike-list-item v-for="item of list"
            :key="item._id"></baike-list-item>
        </ul>

      </template>
    </mz-state>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaikeListItem from './Item.vue'

@Component({ components: { BaikeListItem } })
export default class AcgBaikeList extends Vue {
  state = 'loading'
  displayMode = 'list'
  list: any[] = []

  mounted() {
    setTimeout(() => {
      this.state = 'list'
      this.list = new Array(30).fill('').map((item, index) => ({ _id: index }))
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.acg-baike-list {
  padding: 16px 26px;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.5em;
    padding-bottom: 12px;
  }

  &__switch-layout {
    font-size: 22px;
    .mz-icon {
      color: #999;
      &.active {
        color: var(--color-primary);
      }
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.6;
      }
    }
  }
}

$gutter: 10px;
.acg-baike-list-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-right: -$gutter;
  .acg-baike-list-item {
    width: calc(50% - #{$gutter});
    height: 200px;
    border: 1px solid #ccc;
    margin-bottom: $gutter;
    margin-right: $gutter;
    box-sizing: border-box;
  }

  &--grid {
    .acg-baike-list-item {
      width: 140px;
      height: 200px;
    }
  }
}

@media screen and (max-width: 864px) {
  .acg-baike-list-ul .acg-baike-list-item {
    width: 100%;
  }
}
</style>
