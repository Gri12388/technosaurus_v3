<template>
  <main class="content container">
    <div class="content__top">
      <BreadCrumbs :breadcrumbs="ORDER_BREADCRUMBS" />

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ cmpOrderId }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ cmpOrderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ cmpOrderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ cmpOrderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ cmpOrderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ cmpOrderInfo.payment }}
              </span>
            </li>
          </ul>
        </div>

        <RecapInfo
          :cart-items="cmpOrderInfo.cartItems"
          :total-price="cmpOrderInfo.totalPrice"
          :total-prods="cmpTotalProds"
          :delivery-price="cmpOrderInfo.deliveryPrice"
        />
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import RecapInfo from '@/components/common/RecapInfo.vue';

import { parseOrderObj } from '@/helpers/parsers/orderParsers';
import { ORDER_BREADCRUMBS } from '@/constants/constants';
import { orderPath, origin } from '@/constants/paths';
import { useStore } from '@/store/store';

import type { OrderInfoType } from '@/types/types';

const store = useStore();
const route = useRoute();

const cmpAccessKey = computed<string | null>(() => store.getters.getAccessKey);
const cmpOrderInfo = computed<OrderInfoType>(() => store.getters.getOrderInfo);
const cmpTotalProds = computed(() => cmpOrderInfo.value.cartItems.length);
const cmpOrderId = computed(() => {
  if (cmpOrderInfo.value.orderId === -1) return null;
  else return cmpOrderInfo.value.orderId;
});

const loadOrderInfo = async () => {
  try {
    if (cmpAccessKey.value) {
      const path = `${origin}${orderPath}/${route.params.orderId}`;
      const config = { params: { userAccessKey: cmpAccessKey.value } };
      const res = await axios.get(path, config);
      const orderInfo = parseOrderObj(res.data);
      store.commit('setOrderInfo', { orderInfo });
    } else throw new Error('Variabele "accessKey" is absent');
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  if (cmpOrderInfo.value.orderId === -1) loadOrderInfo();
});
</script>
