<template>
<v-progress-linear
    v-if="isLoading"
      color="deep-purple-accent-4"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
<div v-else class="fallback"></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type Props = {
  isLoading: boolean;
};

defineProps<Props>();
</script>
