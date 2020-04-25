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
