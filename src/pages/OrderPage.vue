<template>
    <main class="content container">
    <div class="content__top">
      <BreadCrumbs :breadcrumbs="ORDER_BREADCRUMBS"/>

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
          <div class="cart__data">
            <InputFormField
              type="text"
              name="name"
              placeholder="Введите ваше полное имя"
              title="ФИО"
              :error="orderFieldsErrors.name"
              v-model:value="orderFieldsValues.name"
            />

            <InputFormField
              type="text"
              name="address"
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
              :error="orderFieldsErrors.address"
              v-model:value="orderFieldsValues.address"
            />

            <InputFormField
              type="tel"
              name="phone"
              placeholder="Введите ваш телефон"
              title="Телефон"
              :error="orderFieldsErrors.phone"
              v-model:value="orderFieldsValues.phone"
            />

            <InputFormField
              type="email"
              name="email"
              placeholder="Введи ваш Email"
              title="Email"
              :error="orderFieldsErrors.email"
              v-model:value="orderFieldsValues.email"
            />

            <TextAreaFormField
              name="comment"
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
              :error="orderFieldsErrors.comment"
              v-model:value="orderFieldsValues.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <DeliveryRadioItem
                v-for="delivery in deliveries"
                :key="delivery.id"
                :delivery="delivery"
                name="delivery"
                v-model:cur-delivery-id="orderFieldsValues.deliveryTypeId"
              />
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <PaymentRadioItem
                v-for="payment in payments"
                :key="payment.id"
                :payment="payment"
                name="payment"
                v-model:cur-payment-id="orderFieldsValues.paymentTypeId"
              />
            </ul>
          </div>
        </div>

        <RecapInfo
          :total-price="cmpTotalPrice"
          :total-prods="cmpTotalProds"
          :cart-items="cmpCartItems"
          :delivery-price="cmpDeliveryPrice"
        >
          <button
            class="cart__button button button--primery"
            @click.prevent="sentOrder"
          >
            Оформить заказ
          </button>
        </RecapInfo>
        <div class="cart__error form__error-block" v-if="cmpIsError">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import {
  computed,
  onMounted,
  ref,
  Ref,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import DeliveryRadioItem from '@/components/order/DeliveryRadioItem.vue';
import InputFormField from '@/components/order/InputFormField.vue';
import PaymentRadioItem from '@/components/order/PaymentRadioItem.vue';
import RecapInfo from '@/components/common/RecapInfo.vue';
import TextAreaFormField from '@/components/order/TextAreaFormField.vue';

import { defaultOrderFieldErrors, defaultOrderFieldsValues, ORDER_BREADCRUMBS } from '@/constants/constants';
import {
  deliveryPath,
  orderPath,
  origin,
  paymentPath,
} from '@/constants/paths';
import { formatProduct } from '@/helpers/formatters';
import {
  parseDeliveries,
  parseOrderError,
  parseOrderObj,
  parsePayments,
} from '@/helpers/parsers';
import { useStore } from '@/store/store';

import type {
  CartItemType,
  DeliveryType,
  OrderFieldsErrorsType,
  OrderFieldsValuesType,
  PaymentType,
} from '@/types/types';

const store = useStore();
const router = useRouter();

const orderFieldsValues: Ref<OrderFieldsValuesType> = ref(cloneDeep(defaultOrderFieldsValues));
const orderFieldsErrors: Ref<OrderFieldsErrorsType> = ref(cloneDeep(defaultOrderFieldErrors));
const deliveries: Ref<DeliveryType[]> = ref([]);
const payments: Ref<PaymentType[]> = ref([]);

const cmpAccessKey = computed<string | null>(() => store.getters.getAccessKey);
const cmpCartItems = computed<CartItemType[]>(() => store.getters.getLocalCart);
const cmpDeliveryTypeId = computed(() => orderFieldsValues.value.deliveryTypeId);
const cmpIsError = computed(() => !!Object.values(orderFieldsErrors.value).find((item) => item !== ''));
const cmpTotalPrice = computed<number>(() => store.getters.getTotalPrice);
const cmpTotalProds = computed<number>(() => store.getters.getTotalProds);
const cmpProductWord = computed(() => formatProduct(cmpTotalProds.value));
const cmpDeliveryPrice = computed(() => {
  const found = deliveries.value.find((item) => item.id === cmpDeliveryTypeId.value);
  if (found) return found.price;
  else return '0';
});

const loadPaymentList = async () => {
  try {
    if (deliveries.value.length > 0) {
      const path = `${origin}${paymentPath}`;
      const config = { params: { deliveryTypeId: orderFieldsValues.value.deliveryTypeId } };
      const res = await axios.get(path, config);
      payments.value = parsePayments(res.data);
      if (payments.value.length > 0) orderFieldsValues.value.paymentTypeId = payments.value[0].id;
    } else throw new Error('Array "deliveries" is empty');
  } catch (err) {
    console.error(err);
  }
};

const loadDeliveryList = async () => {
  try {
    const path = `${origin}${deliveryPath}`;
    const res = await axios.get(path);
    deliveries.value = parseDeliveries(res.data);
    if (deliveries.value.length > 0) orderFieldsValues.value.deliveryTypeId = deliveries.value[0].id;
    loadPaymentList();
  } catch (err) {
    console.error(err);
  }
};

const sentOrder = async () => {
  try {
    if (cmpAccessKey.value) {
      orderFieldsErrors.value = cloneDeep(defaultOrderFieldErrors);
      const path = `${origin}${orderPath}`;
      const data = orderFieldsValues.value;
      const config = { params: { userAccessKey: cmpAccessKey.value } };
      const res = await axios.post(path, data, config);
      console.log('res:', res.data);
      const orderInfo = parseOrderObj(res.data);
      store.commit('setOrderInfo', { orderInfo });
      store.commit('dropServerCart');
      store.commit('syncCarts');
      router.push({ name: 'orderInfo', params: { orderId: orderInfo.orderId } });
    } else throw new Error('Variabele "accessKey" is absent');
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      orderFieldsErrors.value = parseOrderError(err.response.data);
    }
    console.error(err);
  }
};

onMounted(() => loadDeliveryList());
watch(cmpDeliveryTypeId, () => loadPaymentList());
</script>
