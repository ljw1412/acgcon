<template>
  <div class="baike-editor-sidebar">
    <mz-scrollbar :always="false"
      bar-size="4px"
      class="baike-editor-sidebar__scroll-view">
      <mz-list v-model="mValue">
        <mz-list-item v-for="item of navigation"
          v-tooltip.arrow.right="item.title"
          :key="item.value"
          :value="item.value">
          <div class="baike-editor-sidebar-item">
            <mz-icon :name="item.icon"
              size="30"></mz-icon>
          </div>
        </mz-list-item>
      </mz-list>
    </mz-scrollbar>
    <div class="baike-editor-sidebar-footer"
      v-ripple
      @click="addSection">新增模块</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

@Component
export default class AcgBaikeEditorSidebar extends Vue {
  @Model('change:value', String)
  readonly value!: string

  get mValue() {
    return this.value
  }

  set mValue(value: string) {
    this.$emit('change:value', value)
  }

  navigation = [{ title: '核心数据', icon: 'earth-outline', value: 'core' }]

  addSection() {
    this.navigation.push({
      title: '自定义模块',
      icon: 'cube-outline',
      value: Math.random() + ''
    })
    this.$emit('create-section')
  }
}
</script>

<style lang="scss">
.baike-editor-sidebar {
  position: relative;
  height: 100%;

  &__scroll-view {
    height: calc(100% - 24px);
  }
}

.baike-editor-sidebar-item {
  width: 100%;
  height: 80px;
  padding: 25px;
  box-sizing: border-box;
}

.baike-editor-sidebar-footer {
  cursor: pointer;
  width: 100%;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
}
</style>
