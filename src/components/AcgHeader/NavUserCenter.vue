<template>
  <div class="nav-user-center flex-shrink-0">
    <acg-user-avatar inner-info
      radius="50%"
      :size="36" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'

@Component({ components: { AcgUserAvatar } })
export default class NavUserCenter extends Vue {}
</script>

<style lang="scss">
</style>