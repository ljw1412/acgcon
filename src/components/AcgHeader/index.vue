<template>
  <div class="acg-header">
    <topbar></topbar>
    <top-banner></top-banner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Topbar from './Topbar.vue'
import TopBanner from './TopBanner.vue'
@Component({
  components: { Topbar, TopBanner }
})
export default class AcgHeader extends Vue {}
</script>

<style lang="scss">
.acg-header {
  position: relative;
  height: 320px;

  * {
    box-sizing: border-box;
  }
}
</style>