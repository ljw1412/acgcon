<template>
  <div class="baike-editor-section">

    <editor-actions @insert="handleInsert"></editor-actions>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditorActions from './Actions.vue'

@Component({ components: { EditorActions } })
export default class AcgBaikeEditorSection extends Vue {
  handleInsert(type: string) {
    console.log(type)
  }
}
</script>

<style lang="scss">
</style>
