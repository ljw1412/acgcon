<template>
  <div class="acg-login-field">
    <slot name="top"></slot>
    <mz-input-group>
      <mz-input v-model="mValue"
        shadow
        class="acg-login-field__input"
        :type="type"
        :placeholder="placeholder">
      </mz-input>
      <mz-button color="primary"
        icon
        shadow
        height="60px"
        width="60px"
        radius="0"
        class="acg-login-field__entry"
        @click="$emit('entry',value)">
        <mz-icon name="arrow-forward-outline"
          size="26"></mz-icon>
      </mz-button>
    </mz-input-group>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

@Component
export default class AcgLoginField extends Vue {
  @Model('input', String)
  readonly value!: string
  @Prop({ type: String, default: 'text' })
  readonly type!: string
  @Prop(String)
  readonly placeholder!: string

  get mValue() {
    return this.value
  }

  set mValue(val) {
    this.$emit('input', val)
  }
}
</script>

<style lang="scss">
.acg-login-field {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  &__input.mz-size--default {
    height: 60px;
    line-height: 60px;
    border-radius: 0;
    .mz-input__inner {
      font-size: 32px;
      text-align: center;

      &:focus::placeholder {
        opacity: 0.3;
      }
    }
  }

  &__entry {
    flex-shrink: 0;
  }
}
</style>
