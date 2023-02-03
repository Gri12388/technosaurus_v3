<template>
  <v-dialog
    v-model="cmpIsDialogOpen"
    width="500"
  >
  <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Ошибка
        </v-card-title>

        <v-card-text>
          {{ error }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

type Props = {
  error: string | null;
}

type Emits = {
  (e: 'update:error'): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpIsDialogOpen = computed(() => !!props.error);

const closeDialog = () => {
  emit('update:error');
};
</script>
