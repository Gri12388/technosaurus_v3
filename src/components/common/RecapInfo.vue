<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <RecapItemInfo
        v-for="cartItem in cmpLocalCart"
        :key="cartItem.offer.id"
        :cart-item="cartItem"
      />
    </ul>

    <div class="cart__total">
      <!-- <p>Доставка: <b>{{ 500 | formatNumber }} ₽</b></p> -->
      <p>Итого:
        <b>{{ cmpTotalProds }}</b>
        {{ cmpProductWord }} на сумму
        <b>{{ cmpTotalPrice }} ₽</b>
      </p>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import RecapItemInfo from '@/components/common/RecapItemInfo.vue';

import { formatNumber, formatProduct } from '@/helpers/formatters';
import { useStore } from '@/store/store';

import { CartItemType } from '@/types/types';

const store = useStore();

const cmpLocalCart = computed<CartItemType[]>(() => store.getters.getLocalCart);
const cmpTotalPrice = computed<string>(() => formatNumber(store.getters.getTotalPrice));
const cmpTotalProds = computed<number>(() => store.getters.getTotalProds);
const cmpProductWord = computed(() => formatProduct(cmpTotalProds.value));
</script>
