<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form">
      <PriceRange v-model:price-max="priceMax" v-model:price-min="priceMin"/>

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
        @cur-properties="updateCurProperties"
      />

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
import axios from 'axios';
import {
  computed,
  ref,
  Ref,
  watch,
} from 'vue';

import CategorySelect from '@/components/catalog/CategorySelect.vue';
import ColorCheckboxItem from '@/components/catalog/ColorCheckboxItem.vue';
import PropertyCheckbox from '@/components/catalog/PropertyCheckbox.vue';
import PriceRange from '@/components/catalog/PriceRange.vue';

import { categoriesPath, origin } from '@/constants/paths';
import { parseCategory } from '@/helpers/parsers/catalogParsers';
import { useStore } from '@/store/store';

import { ColorType, PropertyType } from '@/types/types';
import { COLOR_PROP_ID } from '@/constants/constants';

const store = useStore();

const cmpColors = computed<ColorType[]>(() => store.getters.getColors);

const priceMin: Ref<number | null> = ref(null);
const priceMax: Ref<number | null> = ref(null);
const curCategId: Ref<number | null> = ref(null);
const curColorsIds: Ref<number[]> = ref([]);
const curProperties: Ref<{ [index: string]: string[] }> = ref({ test: ['text'] });
const properties: Ref<PropertyType[]> = ref([]);

const cmpIsColorsShown = (() => !!properties.value
    && !properties.value.find((item) => item.id === COLOR_PROP_ID)
);
console.log('curProperties:', curProperties.value);
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
  console.log('e:', e);

  curProperties.value = { ...curProperties.value, ...e };
  console.log('curProperties:', curProperties.value);
  console.log('curPropertiesArr:', Object.entries(curProperties.value));
};

watch(curCategId, loadProperties);

</script>
