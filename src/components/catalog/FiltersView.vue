<template>
  <aside class="filter">
    <ErrorDialog :error="loadPropertiesError" @close-dialog="closeDialog" />

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

      <fieldset class="form__block" v-if="cmpIsColorsShown">
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
      <button
      v-if="cmpIsResetButtonShown"
      class="filter__reset button button--second"
      type="button"
      @click="resetFields"
    >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import {
  computed,
  defineEmits,
  onMounted,
  ref,
  Ref,
  watch,
} from 'vue';

import CategorySelect from '@/components/catalog/CategorySelect.vue';
import ColorCheckboxItem from '@/components/catalog/ColorCheckboxItem.vue';
import ErrorDialog from '@/components/common/ErrorDialog.vue';
import PageLimitSelect from '@/components/catalog/PageLimitSelect.vue';
import PropertyCheckbox from '@/components/catalog/PropertyCheckbox.vue';
import PriceRange from '@/components/catalog/PriceRange.vue';

import { COLOR_PROP_ID, defaultError, defaultLimit } from '@/constants/constants';
import { categoriesPath, origin } from '@/constants/paths';
import { handleAxiosError } from '@/helpers/handlers';
import { parseCategory } from '@/helpers/parsers';
import { useStore } from '@/store/store';

import type {
  ColorType,
  ErrorType,
  PropertyType,
  QueryType,
} from '@/types/types';

type Emits = {
  (e: 'filterProducts', value: QueryType): void,
};

const store = useStore();
const emit = defineEmits<Emits>();

const cmpColors = computed<ColorType[]>(() => store.getters.getColors);

const curCategId: Ref<number | null> = ref(null);
const curColorsIds: Ref<number[]> = ref([]);
const curLimit = ref(defaultLimit);
const curProperties: Ref<{ [index: string]: string[] }> = ref({});
const loadPropertiesError: Ref<ErrorType> = ref(cloneDeep(defaultError));
const priceMax: Ref<string | null> = ref(null);
const priceMin: Ref<string | null> = ref(null);
const properties: Ref<PropertyType[]> = ref([]);

const cmpCategoryId = computed<number | null>(() => store.getters.getCategoryId);
const cmpIsColorsShown = computed(() => (
  !!curCategId.value
  && !!properties.value
  && !properties.value.find((item) => item.id === COLOR_PROP_ID)
));

const cmpIsResetButtonShown = computed(() => (
  priceMin.value !== null
  || priceMax.value !== null
  || curCategId.value !== null
));

const closeDialog = () => {
  loadPropertiesError.value.isError = false;
};

const getQuery = () => ({
  categoryId: curCategId.value ? curCategId.value : undefined,
  limit: curLimit.value,
  minPrice: priceMin.value ? Number.parseFloat(priceMin.value) : undefined,
  maxPrice: priceMax.value ? Number.parseFloat(priceMax.value) : undefined,
  props: Object.keys(curProperties.value).length > 0 ? curProperties.value : undefined,
});

const filterProducts = () => {
  if (priceMin.value && priceMax.value && +priceMax.value <= +priceMin.value) {
    priceMax.value = null;
  }
  const query = getQuery();
  emit('filterProducts', query);
};

const loadProperties = async () => {
  try {
    store.commit('setLoadingUp');
    if (curCategId.value) {
      const path = `${origin}${categoriesPath}/${curCategId.value}`;
      const res = await axios.get(path);
      const category = parseCategory(res.data);
      if (category.properties) properties.value = category.properties;
    }
  } catch (err) {
    const errorTitle = 'Свойства товаров не были загружены.';
    if (err instanceof AxiosError) loadPropertiesError.value = handleAxiosError(err, errorTitle);
    else if (err instanceof Error) {
      console.error('err:', err);
      loadPropertiesError.value = { isError: true, errorMessage: err.message, errorTitle };
    }
  } finally {
    store.commit('setLoadingDown');
  }
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

const updateCurProperties = (e: { [index: string]: string[] }) => {
  curProperties.value = { ...curProperties.value, ...e };
};

const updatePriceMax = (e: string | null) => {
  priceMax.value = e;
};

const updatePriceMin = (e: string | null) => {
  priceMin.value = e;
};

onMounted(() => {
  if (cmpCategoryId.value) {
    curCategId.value = cmpCategoryId.value;
    filterProducts();
  }
});

watch(curCategId, loadProperties);
</script>
