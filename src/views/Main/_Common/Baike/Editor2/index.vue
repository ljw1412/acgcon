<template>
  <mz-layout v-cover
    id="acg-baike-editor"
    class="h-100">
    <mz-header v-elevation="1"
      class="position-relative d-flex align-items-center justify-content-between bg-primary px-14">
      <h1 class="text-white">百科编辑器</h1>
      <acg-user-avatar class="start-header__avatar" />
    </mz-header>
    <mz-layout class="h-100">
      <mz-aside v-elevation="1"
        width="64px"
        class="bg-card">
        <editor-menu v-model="value"></editor-menu>
      </mz-aside>
      <mz-main></mz-main>
    </mz-layout>
  </mz-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'
import EditorMenu from './Menu.vue'

@Component({ components: { AcgUserAvatar, EditorMenu } })
export default class AcgBaikeEditor extends Vue {
  value = 'core'
}
</script>

<style lang="scss">
</style>
