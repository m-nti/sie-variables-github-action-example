<template>
  <div class="button-demo">
    <h2>Button Examples</h2>
    
    <div class="button-section">
      <h3>Primary Buttons</h3>
      <div class="button-row">
        <BaseButton>Default</BaseButton>
        <BaseButton disabled>Disabled</BaseButton>
      </div>
    </div>

    <div class="button-section">
      <h3>Secondary Buttons</h3>
      <div class="button-row">
        <BaseButton variant="secondary">Default</BaseButton>
        <BaseButton variant="secondary" disabled>Disabled</BaseButton>
      </div>
    </div>

    <div class="button-section">
      <h3>Tertiary Buttons</h3>
      <div class="button-row">
        <BaseButton variant="tertiary">Default</BaseButton>
        <BaseButton variant="tertiary" disabled>Disabled</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>

<style lang="scss">
@import '@/build/scss/_variables.scss';

.button-demo {
  padding: 2rem;
  background-color: $canvas-frame-bg;
  color: $text-primary;

  .button-section {
    margin-bottom: 2rem;

    h3 {
      color: $text-secondary;
      margin-bottom: 1rem;
    }
  }

  .button-row {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}
</style> 