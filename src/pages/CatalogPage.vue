<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ total }} {{ productWord }} </span>
    </div>

    <div class="content__catalog">
      <FilterView @filter-products="filterProducts" />
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

import { parseProducts } from '@/helpers/parsers';
import { origin, productPath } from '@/constants/paths';
import { formatCards, formatProduct } from '@/helpers/formatters';

import type { ProdCardType, QueryType } from '@/types/types';

const page = ref(1);
const limit = ref(3);
const pages = ref(0);
const total = ref(0);
const cards: Ref<ProdCardType[]> = ref([]);
const query: Ref<QueryType> = ref({});
const productWord = computed(() => formatProduct(total.value));

const loadProducts = async () => {
  const path = `${origin}${productPath}`;
  const config = { params: { ...query.value, page: page.value, limit: limit.value } };

  try {
    const res = await axios.get(path, config);
    const prods = parseProducts(res.data);
    cards.value = formatCards(prods.cards);
    pages.value = prods.pages;
    total.value = prods.total;
  } catch (err) {
    console.error('err:', err);
  }
};

const filterProducts = (value: QueryType) => {
  query.value = value;
};

watch(query, () => loadProducts());
watch(page, () => loadProducts());
onMounted(() => loadProducts());
</script>
