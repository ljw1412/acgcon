<template>
  <div class="baike-editor-section">
    <editor-outline></editor-outline>
    <div class="baike-editor-section-content">
      <editor-actions @insert="handleInsert"></editor-actions>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditorActions from './Actions.vue'
import EditorOutline from './Outline.vue'

@Component({ components: { EditorOutline, EditorActions } })
export default class AcgBaikeEditorSection extends Vue {
  handleInsert(type: string) {
    this.$emit('insert', type)
  }
}
</script>

<style lang="scss">
.baike-editor-section {
  padding-right: 160px;
}
</style>
