<template>
  <v-dialog
    v-model="cmpIsDialogOpen"
    persistent
    width="500"
  >
    <v-card>
      <v-card-title class="text-center bg-green">
        Товар успешно добавлен в корзину
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions class="justify-space-around">
          <router-link :to="{ name: 'catalog' }">
            <v-btn
              color="primary"
            >
              Вернуться в каталог
            </v-btn>
          </router-link>

          <router-link :to="{ name: 'cart' }">
            <v-btn
              color="primary"
            >
              Перейти в корзину
            </v-btn>
          </router-link>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

type Props = {
  isOpened: boolean;
}

type Emits = {
  (e: 'update:isOpen'): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const closeDialog = () => {
  emit('update:isOpen');
};

const cmpIsDialogOpen = computed({
  get: () => props.isOpened,
  set: () => closeDialog(),
});
</script>
