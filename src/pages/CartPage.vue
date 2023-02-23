<template>
  <main class="content container">
    <div class="content__top">
      <BreadCrumbs :breadcrumbs="CART_BREADCRUMBS"/>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cmpTotalProds }} {{ cmpProductWord }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="cartItem in cmpLocalCart"
              :cart-item="cartItem"
              :key="cartItem.offer.id"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cmpTotalPrice }} ₽</span>
          </p>

          <button
            v-if="cmpIsOrderButtonShown"
            class="cart__button button button--primery"
            @click.prevent="gotoOrderPage"
          >
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import CartItem from '@/components/cart/CartItem.vue';

import { CART_BREADCRUMBS } from '@/constants/constants';
import { formatNumber, formatProduct } from '@/helpers/formatters';
import { useStore } from '@/store/store';

import type { CartItemType } from '@/types/types';

const store = useStore();
const router = useRouter();

const cmpTotalProds = computed<number>(() => store.getters.getTotalProds);

const cmpIsOrderButtonShown = computed(() => cmpTotalProds.value !== 0);
const cmpLocalCart = computed<CartItemType[]>(() => store.getters.getLocalCart);
const cmpProductWord = computed(() => formatProduct(cmpTotalProds.value));
const cmpTotalPrice = computed<string>(() => formatNumber(store.getters.getTotalPrice));

const gotoOrderPage = () => router.push({ name: 'order' });
</script>
