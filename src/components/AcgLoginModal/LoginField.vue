<template>
  <div class="acg-login-field">
    <slot name="top"></slot>
    <mz-input-group>
      <mz-input v-model="mValue"
        ref="input"
        shadow
        class="acg-login-field__input"
        :disabled="loading"
        :maxlength="maxlength"
        :type="type"
        :placeholder="placeholder"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keydown.native.enter="!disabled && $emit('entry',value)">
      </mz-input>
      <mz-button color="primary"
        icon
        shadow
        height="60px"
        width="60px"
        radius="0"
        class="acg-login-field__entry"
        :disabled="disabled || loading"
        @click="$emit('entry',value)">
        <mz-loading v-if="loading" />
        <mz-icon v-else
          name="arrow-forward-outline"
          size="26"></mz-icon>
      </mz-button>
    </mz-input-group>
    <transition name="mz-zoom">
      <div v-show="isShowError"
        class="acg-login-field__error">{{error}}</div>
    </transition>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Ref, Watch } from 'vue-property-decorator'
import { MzInput } from 'manzhai-ui/types/packages/Input'

@Component
export default class AcgLoginField extends Vue {
  @Model('input', String)
  readonly value!: string
  @Prop({ type: String, default: 'text' })
  readonly type!: string
  @Prop(String)
  readonly placeholder!: string
  @Prop(Boolean)
  readonly loading!: boolean
  @Prop(Boolean)
  readonly disabled!: boolean
  @Prop([String, Number])
  readonly maxlength!: string | number
  @Prop(String)
  readonly error!: string
  @Ref('input')
  readonly inputRef!: MzInput

  get isShowError() {
    return !!this.error
  }

  get mValue() {
    return this.value
  }

  set mValue(val) {
    this.$emit('input', val)
  }

  focus() {
    try {
      this.inputRef.focus()
    } catch (error) {}
  }

  @Watch('mValue')
  onValueChange(value: string) {
    this.$emit('change', value)
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

  &__error {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    transform: translateY(100%);
    text-align: center;
    color: $color-danger;
    padding: 5px;
    font-weight: 500;
    text-shadow: 1px 1px 1px #000;
  }
}
</style>
