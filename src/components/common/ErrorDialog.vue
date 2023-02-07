<template>
  <v-dialog
    v-model="cmpIsDialogOpen"
    width="500"
  >
  <v-card >
        <v-card-title class="d-flex justify-center align-center text-h5">
          <v-icon icon="mdi-alert-circle-outline" size="large" color="red" class="mr-1"></v-icon>
          Ошибка
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="text-justify">
          <p>{{ error.errorTitle }}</p>
          <p>{{ error.errorMessage }}</p>
          <p>{{ SEE_DETAILS }}</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="closeDialog"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ErrorType } from '@/types/types';
import { computed, defineEmits, defineProps } from 'vue';

import { SEE_DETAILS } from '@/constants/constants';

type Props = {
  error: ErrorType;
};

type Emits = {
  (e: 'closeDialog'): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const closeDialog = () => {
  emit('closeDialog');
};

const cmpIsDialogOpen = computed({
  get: () => props.error.isError,
  set: () => closeDialog(),
});
</script>
