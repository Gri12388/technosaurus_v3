<template>
  <ErrorDialog :error="addProductError" @closeDialog="closeDialog" />
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
    <v-btn
      v-if="isShown"
      class="btn"
      :disabled="isLoading"
      @click="addProduct"
    >
      В конзину
    </v-btn>
    <v-btn v-else class="btn" @click="isShown=true">Товар успешно добавлен</v-btn>
    <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="deep-purple-accent-4"
        class="progress"
      ></v-progress-linear>
  </li>
</template>

<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import {
  computed,
  defineProps,
  ref,
  Ref,
} from 'vue';

import { cartProdsPath, origin } from '@/constants/paths';
import ColorRadioItem from '@/components/common/ColorRadioItem.vue';
import ErrorDialog from '@/components/common/ErrorDialog.vue';
import PropertyRadioItem from '@/components/catalog/PropertyRadioItem.vue';

import { COLOR_PROP_ID, defaultError } from '@/constants/constants';
import { formatNumber } from '@/helpers/formatters';
import {
  initCurColorId,
  initCurOfferId,
  initCurPrice,
  initCurTitle,
  initMainProp,
} from '@/helpers/initers';
import { handleAxiosError } from '@/helpers/handlers';
import { parseCartObj } from '@/helpers/parsers';
import { useStore } from '@/store/store';

import type { ErrorType, ProdCardType, ProdStateType } from '@/types/types';

type Props = {
  card: ProdCardType;
}

const store = useStore();
const props = defineProps<Props>();

const addProductError:Ref<ErrorType> = ref(cloneDeep(defaultError));
const curColorId = ref(initCurColorId(props.card));
const curOfferId = ref(initCurOfferId(props.card));
const curPrice = ref(initCurPrice(props.card));
const curTitle = ref(initCurTitle(props.card));
const isLoading = ref(false);
const isShown = ref(true);
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
        curOfferId.value = found.offer.id;
      }
    }
    curColorId.value = value;
    isShown.value = true;
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
    isShown.value = true;
  },
});
const cmpPrice = computed(() => {
  if (curPrice.value) return formatNumber(curPrice.value);
  else return null;
});

const addProduct = async () => {
  try {
    isLoading.value = true;
    if (cmpCurOfferId.value && cmpCurColorId.value && cmpAccessKey.value) {
      const path = `${origin}${cartProdsPath}`;
      const config = { params: { userAccessKey: cmpAccessKey.value } };
      const data = { productOfferId: cmpCurOfferId.value, colorId: cmpCurColorId.value, quantity: 1 };
      const res = await axios.post(path, data, config);
      const { cartItems } = parseCartObj(res.data);
      store.commit('setServerCart', { serverCart: cartItems });
      store.commit('syncCarts');
      isShown.value = false;
    } else throw new Error('Either variabele "offerId" or variable "colorId" or variable "accessKey" is absent');
  } catch (err) {
    const errorTitle = `Товар "${curTitle.value}" не был добавлен в корзину.`;
    if (err instanceof AxiosError) addProductError.value = handleAxiosError(err, errorTitle);
    else if (err instanceof Error) {
      console.error('err:', err);
      addProductError.value = { isError: true, errorMessage: err.message, errorTitle };
    }
  } finally {
    isLoading.value = false;
  }
};

const closeDialog = () => {
  addProductError.value.isError = false;
};

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
.progress {
  top: -6px !important;
  left: 23% !important;
  width: 90.38px;
}
</style>
