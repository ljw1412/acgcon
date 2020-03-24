<template>
  <mz-modal class="acg-login-modal"
    v-model="mVisible">
  </mz-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

@Component
export default class AcgLoginModal extends Vue {
  @Model('input', { type: Boolean })
  readonly visible!: boolean

  get mVisible() {
    return this.visible
  }

  set mVisible(val: boolean) {
    this.$emit('input', val)
  }
}
</script>

<style lang="scss">
</style>
