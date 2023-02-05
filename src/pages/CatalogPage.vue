<template>
  <main class="content container">
    <ErrorAlert :error="error" @drop-error="dropError" v-if="!!error" />

    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ total }} {{ cmpProductWord }} </span>
    </div>

    <div class="content__catalog">
      <FilterView @filter-products="filterProducts" />
      <GalleryView :cards="cards" :pages="pages" v-model:page="page" />
    </div>
  </main>
</template>

<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import {
  computed,
  onMounted,
  ref,
  Ref,
  watch,
} from 'vue';

import ErrorAlert from '@/components/common/ErrorAlert.vue';
import FilterView from '@/components/catalog/FiltersView.vue';
import GalleryView from '@/components/catalog/GalleryView.vue';

import { defaultError } from '@/constants/constants';
import { origin, productPath } from '@/constants/paths';
import { formatCards, formatProduct } from '@/helpers/formatters';
import { handleAxiosError } from '@/helpers/handlers';
import { parseProducts } from '@/helpers/parsers';

import type { ErrorType, ProdCardType, QueryType } from '@/types/types';

const error: Ref<ErrorType> = ref(cloneDeep(defaultError));
const page = ref(1);
const limit = ref(3);
const pages = ref(0);
const total = ref(0);
const cards: Ref<ProdCardType[]> = ref([]);
const query: Ref<QueryType> = ref({});

const cmpProductWord = computed(() => formatProduct(total.value));

const loadProducts = async () => {
  const path = `${origin}${productPath}1`;
  const config = { params: { ...query.value, page: page.value, limit: limit.value } };

  try {
    const res = await axios.get(path, config);
    const prods = parseProducts(res.data);
    cards.value = formatCards(prods.cards);
    pages.value = prods.pages;
    total.value = prods.total;
  } catch (err) {
    const errorTitle = 'Не удалось загрузить список товаров.';
    if (err instanceof AxiosError) error.value = handleAxiosError(err, errorTitle);
    else if (err instanceof Error) {
      console.error('err:', err);
      error.value = { isError: true, errorMessage: err.message, errorTitle };
    }
  }
};

const filterProducts = (value: QueryType) => {
  query.value = value;
};

const dropError = () => {
  error.value = cloneDeep(defaultError);
};

watch(query, () => loadProducts());
watch(page, () => loadProducts());
onMounted(() => loadProducts());
</script>
