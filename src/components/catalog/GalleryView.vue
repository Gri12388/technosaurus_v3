<template>
  <section class="catalog">
    <ul class="catalog__list">
      <ProdCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :price="card.price"
        :image="card.image"
      />
    </ul>

    <v-pagination
      v-model="page"
      :length="6"
    ></v-pagination>
  </section>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import ProdCard from '@/components/catalog/ProdCard.vue';

import type { ProdCardType } from '@/types/catalogTypes';

type Props = {
  cards: ProdCardType[];
}

defineProps<Props>();

const page = ref(1);

</script>
