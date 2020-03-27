<template>
  <div class="nav-user-center"
    @click="onUserClick">用户名</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class NavUserCenter extends Vue {
  onUserClick() {
    this.$acg.user.login.show()
  }
}
</script>

<style lang="scss">
.nav-user-center {
  color: #fff;
  flex-shrink: 0;
}
</style>