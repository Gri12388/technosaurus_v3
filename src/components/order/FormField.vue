<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span class="form__error">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type Props = {
  title: string;
  error: string;
}

defineProps<Props>();
</script>
