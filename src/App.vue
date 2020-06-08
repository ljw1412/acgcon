<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'

@Component
export default class App extends Vue {
  @(namespace('user').Action)
  readonly fetchCurrentUser!: Function

  created() {
    this.fetchCurrentUser()
  }
}
</script>


<style lang="scss">
</style>
fetchCurrentUser