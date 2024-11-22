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
        <BaseButton variant="tertiary">Tertiary Button</BaseButton>
        <BaseButton variant="tertiary" disabled>Disabled Tertiary</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>

<style lang="scss">
@use '../build/scss/_variables.scss' as *;
@use '../build/scss/_themes.scss' as *;

.button-demo {
  padding: 2rem;
  background-color: var(--canvas-frame-bg);
  color: var(--spez-sheet-text-primary);

  .button-section {
    margin-bottom: 2rem;

    h3 {
      margin-bottom: 1rem;
      color: var(--spez-sheet-text-primary);
    }
  }

  .button-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}
</style> 