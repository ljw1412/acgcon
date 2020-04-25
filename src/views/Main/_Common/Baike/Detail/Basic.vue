<template>
  <acg-title-card title="基本信息"
    class="acg-baike-basic">
    <ul class="acg-baike-basic-block">
      <li class="acg-baike-basic-item"
        v-for="(item, index) of basic"
        :key="index">
        <div class="acg-baike-basic-item__name">{{item.name}}</div>
        <div class="acg-baike-basic-item__value">{{item.value}}</div>
      </li>
    </ul>
  </acg-title-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AcgBaikeBasic extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly basic!: { name: string; value: string }[]
}
</script>

<style lang="scss">
.acg-baike-basic {
  position: relative;
}

.acg-baike-basic-block {
  display: flex;
  flex-wrap: wrap;
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
