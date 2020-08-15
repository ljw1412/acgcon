<template>
  <mz-row class="baike-editor-actions">
    <mz-col v-for="action of actionList"
      class="lh-22 py-8 d-flex align-items-center justify-content-center border cursor-pointer user-select-none"
      v-ripple
      :span="24"
      :key="action.type"
      :style="{ width: actionWidth }"
      @click.native="$emit('insert',action.type)">
      <mz-icon size="22"
        :name="action.icon"></mz-icon>
      <span class="ml-6">{{ action.title }}</span>
    </mz-col>
  </mz-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { sectionItemTypeList } from '../helper'

@Component
export default class BaikeEditorActions extends Vue {
  actionList = sectionItemTypeList

  get actionWidth() {
    return 100 / this.actionList.length + '%'
  }
}
</script>

<style lang="scss">
</style>
