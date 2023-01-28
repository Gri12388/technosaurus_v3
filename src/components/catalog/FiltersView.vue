<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form">
      <PriceRange v-model:price-max="priceMax" v-model:price-min="priceMin"/>

      <CategorySelect v-model:cur-categ-id="curCategId"/>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <ColorCheckboxItem
            v-for="color in cmpColors"
            :key="color.id"
            :input-id="color.id.toString()"
            :color="color"
            name="filter_colors"
            v-model:cur-colors-ids="curColorsIds"
          />
        </ul>
      </fieldset>

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
import { computed, ref } from 'vue';

import CategorySelect from '@/components/catalog/CategorySelect.vue';
import ColorCheckboxItem from '@/components/catalog/ColorCheckboxItem.vue';
import MemoryCheckbox from '@/components/catalog/MemoryCheckbox.vue';
import PriceRange from '@/components/catalog/PriceRange.vue';

import { useStore } from '@/store/store';

import { ColorType } from '@/types/types';

const store = useStore();

const cmpColors = computed<ColorType[]>(() => store.getters.getColors);

const priceMin = ref<number | null>(null);
const priceMax = ref<number | null>(null);
const curCategId = ref<number | null>(null);
const curColorsIds = ref<number[]>([]);
</script>
