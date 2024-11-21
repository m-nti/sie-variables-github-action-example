<template>
  <button 
    :class="[
      'base-button',
      `base-button--${variant}`,
      { 'base-button--disabled': disabled }
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})
</script>

<style lang="scss">
@import '../../build/scss/_variables.scss';

.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 4px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  // Primary variant
  &--primary {
    background-color: $actions-fill-action-fill-primary;
    color: $actions-content-action-content-primary;
    border: $actions-border-action-border-primary;

    &:hover:not(:disabled) {
      background-color: $actions-fill-action-fill-primary-hover;
    }

    &:active:not(:disabled) {
      background-color: $actions-fill-action-fill-primary-active;
    }
  }

  // Secondary variant
  &--secondary {
    background-color: $actions-fill-action-fill-secondary;
    color: $actions-content-action-content-secondary;
    border: 1px solid $actions-border-action-border-secondary;

    &:hover:not(:disabled) {
      color: $actions-content-action-content-secondary-hover;
      border-color: $actions-border-action-border-secondary-hover;
      background-color: $actions-fill-action-fill-secondary-hover;
    }

    &:active:not(:disabled) {
      color: $actions-content-action-content-secondary-active;
      border-color: $actions-border-action-border-secondary-active;
    }
  }

  &:disabled {
    background-color: $actions-fill-action-fill-primary-disabled;
    color: $actions-content-action-content-disabled;
    border-color: $actions-border-action-border-disabled;
    cursor: not-allowed;
  }
}
</style> 