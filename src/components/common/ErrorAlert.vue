<template>
  <v-slide-x-transition class="duration">
    <v-alert
      v-model="cmpIsError"
      color="red"
      icon="mdi-alert-circle-outline"
      border="start"
      elevation="2"
      variant="outlined"
      title="Ошибка"
    >
      <p>{{ error.errorTitle }}</p>
      <p>{{ error.errorMessage }}</p>
      <p>{{ SEE_DETAILS }}</p>
    </v-alert>
  </v-slide-x-transition>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import { SEE_DETAILS } from '@/constants/constants';

import type { ErrorType } from '@/types/types';

type Props = {
  error: ErrorType;
};

const props = defineProps<Props>();

const cmpIsError = computed(() => props.error.isError);
</script>

<style scoped>
.duration {
  transition-duration: 0.5s;
}
</style>
