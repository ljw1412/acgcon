<template>
  <mz-card class="acg-admin-tag-group"
    outlined>
    <div class="acg-admin-tag-group__title flex-center-space-between">
      <span>{{data.name}}</span>
      <span>
        <mz-icon name="md-trash"
          size="20"></mz-icon>
        <mz-icon name="md-reorder"
          size="22"></mz-icon>
      </span>
    </div>
    <div class="acg-admin-tag-group__tags">
      <mz-tag v-for="tag of data.tags"
        closable
        :key="tag._id">{{tag.name}}</mz-tag>
      <mz-tag class="is-pointer"
        @click="handleAddTagClick">
        <mz-icon slot="prefix"
          name="md-add-circle-outline"></mz-icon>
        <span style="padding-left:3px;">新增</span>
      </mz-tag>
    </div>
  </mz-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ComponentName extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: Record<string, any>

  handleAddTagClick() {
    console.log(this.data)
  }
}
</script>

<style lang="scss">
.acg-admin-tag-group {
  height: 100%;
  &__title {
    padding: 15px 10px;
  }

  &__tags {
    padding: 0 10px;
    .mz-tag {
      margin: 0 10px 10px 0;
    }
  }
}
</style>
