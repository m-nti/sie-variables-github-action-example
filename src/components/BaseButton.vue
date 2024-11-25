@use '../build/scss/_themes.scss' as *;
@use '../styles/_fonts.scss';
≈

<template>
  <button 
    class="base-button" 
    :class="[`base-button--${variant}`]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'tertiary'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">



.base-button {
  font-family: 'Siemens Sans', Arial, sans-serif;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 8px 32px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 44px;
  
  // Primary variant (default)
  background-color: var(--action-fill-primary);
  color: var(--action-content-primary);
  border: 1px solid var(--action-border-primary);

  &:hover:not(:disabled) {
    background-color: var(--action-fill-primary-hover);
  }

  &:active:not(:disabled) {
    background-color: var(--action-fill-primary-active);
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
  // Tertiary variant
  &--tertiary {
    background-color: var(--action-fill-secondary);
    color: var(--action-content-secondary);
    border: 1px solid var(--action-border-primary);

    &:hover:not(:disabled) {
      background-color: var(--action-fill-secondary-hover);
      color: var(--action-content-secondary-hover);
      border: 1px solid var(--action-border-primary);
    }

    &:active:not(:disabled) {
      background-color: var(--action-fill-secondary);
      color: var(--action-content-secondary-hover);
      border: 1px solid var(--action-border-primary);
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