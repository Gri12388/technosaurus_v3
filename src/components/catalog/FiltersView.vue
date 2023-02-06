<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form">
      <PageLimitSelect v-model:cur-limit="curLimit" />

      <PriceRange
        :price-max="priceMax"
        :price-min="priceMin"
        @update-price-max="updatePriceMax"
        @update-price-min="updatePriceMin"
      />

      <CategorySelect v-model:cur-categ-id="curCategId"/>

      <fieldset class="form__block" v-if="cmpIsColorsShown()">
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

      <PropertyCheckbox
        v-for="property in properties"
        :key="property.id"
        :property="property"
        @update-cur-properties="updateCurProperties"
      />

      <button
        class="filter__submit button button--primery"
        type="submit"
        @click.prevent="filterProducts"
      >
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="resetFields">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
  computed,
  defineEmits,
  ref,
  Ref,
  watch,
} from 'vue';

import CategorySelect from '@/components/catalog/CategorySelect.vue';
import ColorCheckboxItem from '@/components/catalog/ColorCheckboxItem.vue';
import PageLimitSelect from '@/components/catalog/PageLimitSelect.vue';
import PropertyCheckbox from '@/components/catalog/PropertyCheckbox.vue';
import PriceRange from '@/components/catalog/PriceRange.vue';

import { COLOR_PROP_ID, defaultLimit } from '@/constants/constants';
import { categoriesPath, origin } from '@/constants/paths';
import { parseCategory } from '@/helpers/parsers';
import { useStore } from '@/store/store';

import type { ColorType, PropertyType, QueryType } from '@/types/types';

type Emits = {
  (e: 'filterProducts', value: QueryType): void,
};

const store = useStore();
const emit = defineEmits<Emits>();

const cmpColors = computed<ColorType[]>(() => store.getters.getColors);

const priceMin: Ref<string | null> = ref(null);
const priceMax: Ref<string | null> = ref(null);
const curCategId: Ref<number | null> = ref(null);
const curColorsIds: Ref<number[]> = ref([]);
const curLimit = ref(defaultLimit);
const curProperties: Ref<{ [index: string]: string[] }> = ref({});
const properties: Ref<PropertyType[]> = ref([]);

const cmpIsColorsShown = (() => !!curCategId.value
    && !!properties.value
    && !properties.value.find((item) => item.id === COLOR_PROP_ID)
);

const loadProperties = async () => {
  if (curCategId.value) {
    try {
      const path = `${origin}${categoriesPath}/${curCategId.value}`;
      const res = await axios.get(path);
      const category = parseCategory(res.data);
      if (category.properties) properties.value = category.properties;
    } catch (err) {
      console.error(err);
    }
  }
};

const updateCurProperties = (e: { [index: string]: string[] }) => {
  curProperties.value = { ...curProperties.value, ...e };
};

const updatePriceMin = (e: string | null) => {
  priceMin.value = e;
};

const updatePriceMax = (e: string | null) => {
  priceMax.value = e;
};

const getQuery = () => ({
  categoryId: curCategId.value ? curCategId.value : undefined,
  limit: curLimit.value,
  minPrice: priceMin.value ? Number.parseFloat(priceMin.value) : undefined,
  maxPrice: priceMax.value ? Number.parseFloat(priceMax.value) : undefined,
  props: Object.keys(curProperties.value).length > 0 ? curProperties.value : undefined,
});

const filterProducts = () => {
  const query = getQuery();
  emit('filterProducts', query);
};

const resetFields = () => {
  priceMin.value = null;
  priceMax.value = null;
  curCategId.value = null;
  curColorsIds.value = [];
  curProperties.value = {};
  properties.value = [];
  filterProducts();
};

watch(curCategId, loadProperties);
</script>
