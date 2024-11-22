<template>
  <div class="app" :class="currentTheme">
    <button class="theme-switcher" @click="toggleTheme">
      Switch to {{ currentTheme === 'theme-light' ? 'Dark' : 'Light' }} Theme
    </button>
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
import { ref } from 'vue'
import BaseButton from './components/BaseButton.vue'

const currentTheme = ref('theme-light')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'theme-light' ? 'theme-dark' : 'theme-light'
}
</script>

<style lang="scss">
@use '../build/scss/_variables.scss' as *;
@use '../build/scss/_themes.scss' as *;

.app {
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--canvas-frame-bg);
  color: var(--spez-sheet-text-primary);

  &.theme-light {
    @include light-theme;
  }

  &.theme-dark {
    @include dark-theme;
  }

  .theme-switcher {
    margin-bottom: 2rem;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: var(--action-fill-primary);
    color: var(--action-content-primary);
    border: 1px solid var(--action-border-primary);
    cursor: pointer;
    
    &:hover {
      background-color: var(--action-fill-primary-hover);
    }
  }

  .button-demo {
    h2 {
      margin-bottom: 2rem;
      color: var(--spez-sheet-text-primary);
    }

    .button-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
  }
}
</style> 