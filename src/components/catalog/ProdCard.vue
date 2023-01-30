<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { productId: card.id } }"
      @click="saveProdState"
    >
      <img :src="card.image" alt="curTitle" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ curTitle }} </a>
    </h3>

    <span class="catalog__price"> {{ cmpPrice }} ₽ </span>

    <ul class="colors colors--black">
      <ColorRadioItem
        v-for="color in card.colors"
        :key="`${card.id}_${color.id}`"
        :input-id="`${card.id}_${color.id}`"
        :name="`color_${card.id}`"
        :color="color"
        v-model:cur-color-id="cmpCurColorId"
      />
    </ul>
    <p class="main-prop">{{ mainProp }}</p>
    <ul class="mainPropList">
      <MainPropView
        v-for="offer in card.offers"
          :key="`${card.id}_${offer.id}`"
          :input-id="`${card.id}_${offer.id}`"
          :main-prop-id="card.mainProp.id"
          :name="`mainProp_${card.id}`"
          :offer="offer"
          v-model:cur-offer-id="cmpCurOfferId"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';

import ColorRadioItem from '@/components/common/ColorRadioItem.vue';
import MainPropView from '@/components/catalog/MainPropView.vue';

import { COLOR_PROP_ID } from '@/constants/constants';
import { formatNumber } from '@/helpers/formatters';
import {
  initCurColorId,
  initCurOfferId,
  initCurPrice,
  initCurTitle,
  initMainProp,
} from '@/helpers/helpers';
import { useStore } from '@/store/store';

import type { ProdCardType, ProdStateType } from '@/types/types';

type Props = {
  card: ProdCardType;
}

const store = useStore();
const props = defineProps<Props>();

const curColorId = ref(initCurColorId(props.card));
const curOfferId = ref(initCurOfferId(props.card));
const curTitle = ref(initCurTitle(props.card));
const curPrice = ref(initCurPrice(props.card));
const mainProp = ref(initMainProp(props.card));

const cmpCurColorId = computed({
  get: () => curColorId.value,
  set: (value: number | null) => {
    if (props.card.mainProp.id === COLOR_PROP_ID && value) {
      const found = props.card.colors.find((item) => item.id === value);
      if (found && found.offer) {
        curTitle.value = found.offer.title;
        curPrice.value = found.offer.price;
      }
    }
    return value;
  },
});

const cmpCurOfferId = computed({
  get: () => curOfferId.value,
  set: (value: number | null) => {
    if (props.card.mainProp.id !== COLOR_PROP_ID && value) {
      const found = props.card.offers.find((item) => item.id === value);
      if (found) {
        curTitle.value = found.title;
        curPrice.value = found.price;
      }
    }
    return value;
  },
});

const cmpPrice = computed(() => {
  if (typeof curPrice.value === 'number') return formatNumber(curPrice.value);
  else return curPrice.value;
});

const saveProdState = () => {
  const prodState: ProdStateType = {
    curColorId: curColorId.value,
    curOfferId: curOfferId.value,
    curPrice: curPrice.value,
    curTitle: curTitle.value,
  };

  store.commit('setProdState', { prodState });
};
</script>

<style scoped>
.main-prop {
  padding: 8px 0;
}
</style>

<style >
.mainPropList {
  display: flex;
  list-style-type: none;
}
</style>
