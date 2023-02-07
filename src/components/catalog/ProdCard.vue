<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { productId: card.id } }"
      @click="saveProdState"
    >
      <img class="image" :src="card.image" alt="curTitle" />
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
      <PropertyRadioItem
        v-for="offer in card.offers"
          :key="`${card.id}_${offer.id}`"
          :input-id="`${card.id}_${offer.id}`"
          :main-prop-id="card.mainProp.id"
          :name="`mainProp_${card.id}`"
          :offer="offer"
          v-model:cur-offer-id="cmpCurOfferId"
      />
    </ul>
    <v-btn class="btn" @click="addProduct">В конзину</v-btn>
  </li>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  ref,
} from 'vue';

import ColorRadioItem from '@/components/common/ColorRadioItem.vue';
import PropertyRadioItem from '@/components/catalog/PropertyRadioItem.vue';

import { COLOR_PROP_ID } from '@/constants/constants';
import { formatNumber } from '@/helpers/formatters';
import {
  initCurColorId,
  initCurOfferId,
  initCurPrice,
  initCurTitle,
  initMainProp,
} from '@/helpers/initers';
import { addProductRequest } from '@/helpers/requesters';
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

const cmpAccessKey = computed<string | null>(() => store.getters.getAccessKey);

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

    curColorId.value = value;
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
    curOfferId.value = value;
  },
});

const cmpPrice = computed(() => {
  if (curPrice.value) return formatNumber(curPrice.value);
  else return null;
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

const addProduct = async () => {
  try {
    store.commit('setLoadingUp');
    if (cmpCurOfferId.value && cmpCurColorId.value && cmpAccessKey.value) {
      const params = {
        accessKey: cmpAccessKey.value,
        curColorId: cmpCurColorId.value,
        curOfferId: cmpCurOfferId.value,
        qty: 1,
      };
      const { cartItems } = await addProductRequest(params);
      store.commit('setServerCart', { serverCart: cartItems });
      store.commit('syncCarts');
    } else throw new Error('Either variabele "offerId" or variable "colorId" or variable "accessKey" is absent');
  } catch (err) {
    // const errorTitle = 'Товар не был добавлен в корзину.';
    // if (err instanceof AxiosError) loadProductError.value = handleAxiosError(err, errorTitle);
    // else if (err instanceof Error) {
    //   console.error('err:', err);
    //   loadProductError.value = { isError: true, errorMessage: err.message, errorTitle };
    // }
  } finally {
    store.commit('setLoadingDown');
  }
};
</script>

<style scoped>
.main-prop {
  padding: 8px 0;
}
</style>

<style scoped>
.btn {
  background: #9eff00;
  color: #fff;
  margin-top: 4px;
}
.image {
display: block;
object-fit: contain;
margin: 0 auto;
}
.mainPropList {
  display: flex;
  list-style-type: none;
}
</style>
