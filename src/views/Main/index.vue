<template>
  <div class="acg-main">
    <acg-header></acg-header>
    <router-view :name="acgType"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AcgHeader from '@/components/AcgHeader/index.vue'
@Component({
  components: {
    AcgHeader
  }
})
export default class AcgHome extends Vue {
  get acgType() {
    return this.$route.params.acgType
  }
}
</script>

<style lang="scss">
</style>