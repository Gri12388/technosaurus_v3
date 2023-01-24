<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ total }} {{ productWord }} </span>
    </div>

    <div class="content__catalog">
      <FilterView />
      <GalleryView :cards="cards" :pages="pages" v-model:page="page" />
    </div>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
  computed,
  onMounted,
  ref,
  Ref,
  watch,
} from 'vue';

import FilterView from '@/components/catalog/FiltersView.vue';
import GalleryView from '@/components/catalog/GalleryView.vue';

import { origin, productPath } from '@/constants/paths';
import { formatProduct } from '@/helpers/formatters';
import { parseProducts } from '@/helpers/parsers';

import type { ProdCardType } from '@/types/catalogTypes';

const page = ref(1);
const limit = ref(3);
const pages = ref(0);
const total = ref(0);
const cards: Ref<ProdCardType[]> = ref([]);
const productWord = computed(() => formatProduct(total.value));

const loadProducts = async () => {
  const path = `${origin}${productPath}`;
  const config = { params: { page: page.value, limit: limit.value } };

  try {
    const res = await axios.get(path, config);
    const prods = parseProducts(res.data);
    cards.value = prods.cards;
    pages.value = prods.pages;
    total.value = prods.total;
  } catch (err) {
    console.error('err:', err);
  }
};

watch(page, () => loadProducts());
onMounted(() => loadProducts());
</script>
