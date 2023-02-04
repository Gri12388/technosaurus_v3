<template>
  <section class="catalog">
    <ul class="catalog__list">
      <ProdCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
      />
    </ul>

    <v-pagination
      v-if="cmpIsPaginationShown"
      v-model="pageHandler"
      :length="pages"
    ></v-pagination>
  </section>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
} from 'vue';
import ProdCard from '@/components/catalog/ProdCard.vue';

import type { ProdCardType } from '@/types/types';

type Props = {
  cards: ProdCardType[];
  page: number;
  pages: number;
};

type Emits = {
  (e: 'update:page', value: number): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const pageHandler = computed({
  get: () => props.page,
  set: (value: number) => emit('update:page', value),
});

const cmpIsPaginationShown = computed(() => props.pages > 1);

</script>
