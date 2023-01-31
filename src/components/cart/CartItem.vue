<template>
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
    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <input type="text" value="1" name="count">
      <button type="button" aria-label="Добавить один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    <b class="product__price">
      4 990 ₽
    </b>
    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import { COLOR_PROP_ID } from '@/constants/constants';

import { CartItemType } from '@/types/types';

type Props = {
  cartItem: CartItemType;
};

const props = defineProps<Props>();

const cmpIsColorMainProp = computed(() => props.cartItem.mainProp.id === COLOR_PROP_ID);
</script>

<style scoped>
.size {
  display: block;
  height: 120px;
  margin: 0 auto;
}
</style>
