<template>
  <li class="cart__order">
    <h3>{{ cartItem.offer.title }}</h3>
    <div>
      <b>{{ cmpPrice }} ₽</b>
      <br />
      <b>{{ cartItem.qty }} шт.</b>
    </div>
    <span>Артикул: {{ cartItem.offer.id }}</span>
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import { formatNumber } from '@/helpers/formatters';

import type { CartItemType } from '@/types/types';

type Props = {
  cartItem: CartItemType;
};

const props = defineProps<Props>();

const cmpPrice = computed(() => formatNumber(props.cartItem.offer.price));
</script>
