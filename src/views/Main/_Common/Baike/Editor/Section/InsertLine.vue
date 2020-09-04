<template>
  <div class="insert-line position-relative py-3 cursor-pointer d-flex align-items-center"
    :class="{'is-active': active}">
    <div class="line"></div>
    <div class="plus-icon">
      <mz-icon name="add-circle"
        size="16"></mz-icon>
    </div>
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaikeEditorInsertLine extends Vue {
  @Prop(Boolean)
  readonly active!: boolean
}
</script>

<style lang="scss">
.insert-line {
  .plus-icon {
    display: none;
  }

  .line {
    visibility: hidden;
    width: 100%;
    height: 2px;
    background-color: $gray-700;
  }

  &.is-active,
  &:hover {
    > * {
      visibility: visible;
    }
    .plus-icon {
      display: block;
    }
  }
}
</style>
