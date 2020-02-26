<template>
  <div class="nav-user-center">用户名</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class NavUserCenter extends Vue {}
</script>

<style lang="scss">
.nav-user-center {
  color: #fff;
  flex-shrink: 0;
}
</style>