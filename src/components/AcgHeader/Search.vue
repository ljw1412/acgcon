<template>
  <div class="acg-header-search">
    <mz-input v-model="value"
      size="large"
      shadow></mz-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AcgHeaderSearch extends Vue {
  value = ''
}
</script>

<style lang="scss">
.acg-header-search {
  width: calc(100% - 40px);
  max-width: 500px;
  height: 36px;
  transition: width 0.3s;
}
</style>
