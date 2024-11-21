<template>
  <div class="app">
    <div class="button-demo">
      <h2>Button Examples</h2>
      <div class="button-row">
        <BaseButton>Primary Button</BaseButton>
        <BaseButton variant="secondary">Secondary Button</BaseButton>
      </div>
      <div class="button-row">
        <BaseButton disabled>Disabled Primary</BaseButton>
        <BaseButton variant="secondary" disabled>Disabled Secondary</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './components/BaseButton.vue'
</script>

<style lang="scss">
@import '../build/scss/_variables.scss';

.app {
  min-height: 100vh;
  background-color: $canvas-frame-bg;
  padding: 2rem;
  color: $spez-sheet-text-primary;
}

.button-demo {
  h2 {
    margin-bottom: 2rem;
    color: $spez-sheet-text-primary;
  }

  .button-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}
</style> 