<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form">
      <PriceRange v-model:price-max="priceMax" v-model:price-min="priceMin"/>

      <CategorySelect v-model:cur-categ="curCateg"/>

      <ColorRadio />

      <MemoryCheckbox />

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CategorySelect from '@/components/catalog/CategorySelect.vue';
import ColorRadio from '@/components/catalog/ColorRagio.vue';
import MemoryCheckbox from '@/components/catalog/MemoryCheckbox.vue';
import PriceRange from '@/components/catalog/PriceRange.vue';

const priceMin = ref<number | null>(null);
const priceMax = ref<number | null>(null);
const curCateg = ref<number | null>(null);
</script>
