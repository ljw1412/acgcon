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
  transition: width 0.3s;
}

@media screen and (max-width: 1080px) {
  .nav-search {
    width: 40%;
  }
}

@media screen and (max-width: 768px) {
  .nav-search {
    display: none;
  }
}
</style>