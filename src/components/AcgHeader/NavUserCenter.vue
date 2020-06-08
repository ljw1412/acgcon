<template>
  <div class="nav-user-center"
    @click="onUserClick">{{nickname}}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgUser from '@/mixins/AcgUser'

@Component
export default class NavUserCenter extends AcgUser {}
</script>

<style lang="scss">
.nav-user-center {
  color: #fff;
  flex-shrink: 0;
}
</style>