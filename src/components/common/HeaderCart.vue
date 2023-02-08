<template>
  <router-link
    :to="{ name: 'cart' }"
    class="header__cart"
    href="cart.html"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ cmpTotalProds }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useStore } from '@/store/store';

const store = useStore();

const cmpTotalProds = computed<number>(() => store.getters.getTotalProds);
</script>
