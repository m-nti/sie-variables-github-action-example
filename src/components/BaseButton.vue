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
@use '../../build/scss/_variables.scss' as *;
@use '../../build/scss/_themes.scss' as *;

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
    background-color: var(--action-fill-primary);
    color: var(--action-content-primary);
    border: 1px solid var(--action-border-primary);

    &:hover:not(:disabled) {
      background-color: var(--action-fill-primary-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--action-fill-primary-active);
    }
  }

  // Secondary variant
  &--secondary {
    background-color: var(--action-fill-secondary);
    color: var(--action-content-secondary);
    border: 1px solid var(--action-border-secondary);

    &:hover:not(:disabled) {
      color: var(--action-content-secondary-hover);
      border-color: var(--action-border-secondary-hover);
      background-color: var(--action-fill-secondary-hover);
    }

    &:active:not(:disabled) {
      color: var(--action-content-secondary-active);
      border-color: var(--action-border-secondary-active);
      background-color: var(--action-fill-secondary-active);
    }
  }

  &:disabled {
    background-color: var(--action-fill-primary-disabled);
    color: var(--action-content-disabled);
    border-color: var(--action-border-disabled);
    cursor: not-allowed;
  }
}
</style> 