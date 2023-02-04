<template>
  <v-slide-x-transition mode="out-in" class="duration">
    <v-alert
      v-model="cmpIsError"
      closable
      close-icon="mdi-close-thick"
      color="red"
      icon="mdi-alert-circle-outline"
      border="start"
      elevation="2"
      variant="outlined"
      title="Ошибка"
    >
      <p>{{ error.errorMessage }}</p>
      <p>{{ SEE_DETAILS }}</p>
    </v-alert>
  </v-slide-x-transition>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import { SEE_DETAILS } from '@/constants/constants';

import type { ErrorType } from '@/types/types';

type Props = {
  error: ErrorType;
};

type Emits = {
  (e: 'dropError'): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpIsError = computed({
  get: () => props.error.isError,
  set: () => emit('dropError'),
});
</script>

<style>
.duration {
  transition-duration: 1s;
}
</style>
