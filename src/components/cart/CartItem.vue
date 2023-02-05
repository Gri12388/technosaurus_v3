<template>
  <ErrorAlert :error="deleteProductError" @drop-error="dropDeleteProductError" />
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="cartItem.image"
        :alt="cartItem.offer.title"
        class="size"
      >
    </div>
    <h3 class="product__title">
      {{ cartItem.offer.title }}
    </h3>
    <p class="product__info product__info--color" v-if="cmpIsColorMainProp">
      Цвет:
      <span>
        <i :style="`background-color: ${ cartItem.color.code }`"></i>
        {{ cartItem.color.title }}
      </span>
    </p>
    <p class="product__info" v-else>
      {{ cartItem.mainProp.title }}: <span>{{ cartItem.offer.value }}</span>
    </p>
    <span class="product__code">
      Артикул: {{ cartItem.offer.id }}
    </span>

    <CounterView
      :qty="qty"
      @update-counter="updateCounter"
    />

    <b class="product__price">
      {{ cmpSum }} ₽
    </b>
    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="deleteCartItem"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import {
  computed,
  defineProps,
  Ref,
  ref,
  watch,
} from 'vue';

import CounterView from '@/components/common/CounterView.vue';
import ErrorAlert from '@/components/common/ErrorAlert.vue';

import { COLOR_PROP_ID, defaultError } from '@/constants/constants';
import { origin, cartProdsPath } from '@/constants/paths';
import { formatNumber } from '@/helpers/formatters';
import { handleAxiosError } from '@/helpers/handlers';
import { parseCartObj } from '@/helpers/parsers';
import { useStore } from '@/store/store';

import type { CartItemType, ErrorType } from '@/types/types';

type Props = {
  cartItem: CartItemType;
};

const store = useStore();
const props = defineProps<Props>();

const qty = ref(props.cartItem.qty);

const deleteProductError: Ref<ErrorType> = ref(cloneDeep(defaultError));

const cmpAccessKey = computed<string | null>(() => store.getters.getAccessKey);
const cmpIsColorMainProp = computed(() => props.cartItem.mainProp.id === COLOR_PROP_ID);
const cmpSum = computed(() => formatNumber(qty.value * props.cartItem.offer.price));

const updateCounter = (e: number) => {
  store.commit('setLocalCartItemQty', { id: props.cartItem.id, qty: e });
};

const deleteCartItem = async () => {
  try {
    if (cmpAccessKey.value) {
      const path = `${origin}${cartProdsPath}`;
      const config = {
        params: { userAccessKey: cmpAccessKey.value }, data: { basketItemId: props.cartItem.id },
      };
      const res = await axios.delete(path, config);
      const { cartItems } = parseCartObj(res.data);
      store.commit('setServerCart', { serverCart: cartItems });
      store.commit('syncCarts');
    } else throw new Error('Variable "accessKey" is absent');
  } catch (err) {
    const errorTitle = 'Не удалось удалить данный товар.';
    if (err instanceof AxiosError) deleteProductError.value = handleAxiosError(err, errorTitle);
    else if (err instanceof Error) {
      console.error('err:', err);
      deleteProductError.value = { isError: true, errorMessage: err.message, errorTitle };
    }
  }
};

const changeCartItem = async () => {
  try {
    if (cmpAccessKey.value) {
      const path = `${origin}${cartProdsPath}`;
      const data = { basketItemId: props.cartItem.id, quantity: qty.value };
      const config = { params: { userAccessKey: cmpAccessKey.value } };
      const res = await axios.put(path, data, config);
      const { cartItems } = parseCartObj(res.data);
      store.commit('setServerCart', { serverCart: cartItems });
    } else throw new Error('Variable "accessKey" is absent');
  } catch (err) {
    console.error(err);
    store.commit('syncCarts');
  }
};

const dropDeleteProductError = () => {
  deleteProductError.value = cloneDeep(defaultError);
};

watch(qty, () => changeCartItem());
watch(props, () => {
  if (props.cartItem.qty !== qty.value) qty.value = props.cartItem.qty;
});
</script>

<style scoped>
.size {
  display: block;
  height: 120px;
  margin: 0 auto;
}
</style>
