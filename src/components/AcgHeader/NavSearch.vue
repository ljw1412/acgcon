<template>
  <div class="nav-search absolute-center">

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class NavSearch extends Vue {
  value = ''
}
</script>

<style lang="scss">
.nav-search {
  margin: 0 10px;
  width: 480px;
  height: 36px;
  background-color: #fff;
}

@media screen and (max-width: 1000px) {
  .nav-search {
    position: relative;
    transform: none;
    left: initial;
    top: initial;
  }
}
</style>