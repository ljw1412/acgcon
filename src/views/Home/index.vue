<template>
  <div class="home">
    <div class=""></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>