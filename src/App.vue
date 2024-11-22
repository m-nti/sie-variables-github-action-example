<template>
  <div class="app" :class="currentTheme">
    <div class="header">
      <h2>Button Examples</h2>
      <button class="theme-switcher" @click="toggleTheme">
        <span class="icon">{{ currentTheme === 'theme-light' ? '🌙' : '☀️' }}</span>
        <span class="text">Switch to {{ currentTheme === 'theme-light' ? 'Dark' : 'Light' }}</span>
        <div class="ripple-effect"></div>
      </button>
    </div>
    <div class="button-demo">
      <div class="button-grid">
        <div class="button-group">
          <div class="button-stack">
            <BaseButton>Primary Button</BaseButton>
          </div>
        </div>

        <div class="button-group">
          <div class="button-stack">
            <BaseButton variant="secondary">Secondary Button</BaseButton>
          </div>
        </div>

        <div class="button-group">
          <div class="button-stack">
            <BaseButton variant="tertiary">Tertiary Button</BaseButton>
          </div>
        </div>
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;

    h2 {
      color: var(--spez-sheet-text-primary);
      margin: 0;
      font-family: "Comic Sans MS", "Comic Sans", cursive;
      font-size: 1.5rem;
    }
  }

  .theme-switcher {
    position: relative;
    padding: 8px 16px;
    border-radius: 50px;
    background: var(--action-fill-primary);
    color: var(--action-content-primary);
    border: 2px solid transparent;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    .icon {
      font-size: 1.2em;
      transform-origin: center;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .text {
      font-weight: 500;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-size: 0.9em;
    }

    .ripple-effect {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      background: radial-gradient(
        circle,
        var(--action-fill-primary-hover) 0%,
        transparent 70%
      );
      border-radius: 50%;
      transition: width 0.6s ease-out, height 0.6s ease-out;
      opacity: 0.5;
    }

    &:hover {
      background: var(--action-fill-primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      .icon {
        transform: rotate(360deg);
      }

      .ripple-effect {
        width: 150px;
        height: 150px;
      }
    }

    &:active {
      transform: translateY(0);
      background: var(--action-fill-primary-active);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    // Theme-specific styles
    .theme-dark & {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      }
    }
  }

  .button-demo {
    .button-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      max-width: fit-content;
    }

    .button-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .button-stack {
      :deep(.base-button) {
        width: 200px;
        justify-content: center;
      }
    }
  }
}
</style> 