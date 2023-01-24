<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <FilterView />
      <GalleryView :cards="cards" />
    </div>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, Ref } from 'vue';

import FilterView from '@/components/catalog/FiltersView.vue';
import GalleryView from '@/components/catalog/GalleryView.vue';

import { origin, productPath } from '@/constants/paths';
import { parseProducts } from '@/helpers/parsers';

import type { ProdCardType } from '@/types/catalogTypes';

const page = ref(0);
const limit = ref(3);
const cards: Ref<ProdCardType[]> = ref([]);

const loadProducts = async () => {
  const path = `${origin}${productPath}`;
  const config = { params: { page: page.value, limit: limit.value } };

  try {
    const res = await axios.get(path, config);
    cards.value = parseProducts(res.data);
  } catch (err) {
    console.error('err:', err);
  }
};

onMounted(() => loadProducts());
</script>
