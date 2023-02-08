<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <RecapItemInfo
        v-for="cartItem in cartItems"
        :key="cartItem.offer.id"
        :cart-item="cartItem"
      />
    </ul>

    <div class="cart__total">
      <p v-if="cmpIsDelivery">Доставка: <b>{{ formatNumber(+deliveryPrice) }} ₽</b></p>
      <p>Итого:
        <b>{{ totalProds }}</b>
        {{ cmpProductWord }} на сумму
        <b>{{ cmpTotalPrice }} ₽</b>
      </p>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import RecapItemInfo from '@/components/common/RecapItemInfo.vue';

import { formatNumber, formatProduct } from '@/helpers/formatters';

import { CartItemType } from '@/types/types';

type Props = {
  cartItems: CartItemType[];
  deliveryPrice: string;
  totalPrice: number;
  totalProds: number;
};

const props = defineProps<Props>();

const cmpIsDelivery = computed(() => props.deliveryPrice !== '0');
const cmpProductWord = computed(() => formatProduct(props.totalProds));
const cmpTotalPrice = computed<string>(() => formatNumber(props.totalPrice));
</script>
