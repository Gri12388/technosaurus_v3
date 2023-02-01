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
            <label class="form__label">
              <input class="form__input" type="text" name="name" placeholder="Введите ваше полное имя">
              <span class="form__value">ФИО</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="text" name="address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="tel" name="phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="email" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
            </label>

            <label class="form__label">
              <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
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
import { computed } from 'vue';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import RecapInfo from '@/components/common/RecapInfo.vue';

import { ORDER_BREADCRUMBS } from '@/constants/constants';
import { useStore } from '@/store/store';
import { formatProduct } from '@/helpers/formatters';

const store = useStore();

const cmpTotalProds = computed<number>(() => store.getters.getTotalProds);
const cmpProductWord = computed(() => formatProduct(cmpTotalProds.value));
</script>