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
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <InputFormField
              type="text"
              name="name"
              placeholder="Введите ваше полное имя"
              title="ФИО"
              error="error"
              v-model:value="orderFieldsValues.name"
            />

            <InputFormField
              type="text"
              name="address"
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
              error="error"
              v-model:value="orderFieldsValues.address"
            />

            <InputFormField
              type="tel"
              name="phone"
              placeholder="Введите ваш телефон"
              title="Телефон"
              error="error"
              v-model:value="orderFieldsValues.phone"
            />

            <InputFormField
              type="email"
              name="email"
              placeholder="Введи ваш Email"
              title="Email"
              error="error"
              v-model:value="orderFieldsValues.email"
            />

            <TextAreaFormField
              name="comments"
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
              error="error"
              v-model:value="orderFieldsValues.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <RecapInfo>
          <button
            class="cart__button button button--primery"
          >
            Оформить заказ
          </button>
        </RecapInfo>
        <div class="cart__error form__error-block">
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
import { cloneDeep } from 'lodash';
import {
  computed,
  ref,
  Ref,
} from 'vue';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import RecapInfo from '@/components/common/RecapInfo.vue';
import InputFormField from '@/components/order/InputFormField.vue';
import TextAreaFormField from '@/components/order/TextAreaFormField.vue';

import { defaultOrderFieldsValues, ORDER_BREADCRUMBS } from '@/constants/constants';
import { useStore } from '@/store/store';
import { formatProduct } from '@/helpers/formatters';

import { OrderFieldsValuesType } from '@/types/types';

const store = useStore();

const orderFieldsValues: Ref<OrderFieldsValuesType> = ref(cloneDeep(defaultOrderFieldsValues));

const cmpTotalProds = computed<number>(() => store.getters.getTotalProds);
const cmpProductWord = computed(() => formatProduct(cmpTotalProds.value));
</script>
