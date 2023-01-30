<template>
  <main class="content container">
    <div class="content__top">
      <BreadCrumbs :breadcrumbs="cmpBreadCrumbsArr"/>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper" v-if="product">
          <img class="image" :src="product.image" alt="Название товара">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/phone-square-1.jpg" srcset="img/phone-square-1@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-2.jpg" srcset="img/phone-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-3.jpg" srcset="img/phone-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img width="98" height="98" src="img/phone-square-4.jpg" srcset="img/phone-square-4@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span v-if="product" class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          Смартфон Xiaomi Mi Mix 3 6/128GB
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price">
              18 990 ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="blue">
                    <span class="colors__value" style="background-color: #73B6EA;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="yellow">
                    <span class="colors__value" style="background-color: #FFBE15;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="gray">
                    <span class="colors__value" style="background-color: #939393;">
                  </span></label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <CounterView
                @update-counter="updateCounter"
              />

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">

        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
  computed,
  onMounted,
  ref,
  Ref,
} from 'vue';
import { useRoute } from 'vue-router';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import CounterView from '@/components/common/CounterView.vue';

import { origin, productPath } from '@/constants/paths';
import { parseProductRes } from '@/helpers/parsers/productParsers';

import { BreadCrumbType, ProductType } from '@/types/types';

const route = useRoute();

const product: Ref<ProductType | null> = ref(null);
const qty = ref(1);

const cmpBreadCrumbsArr = computed<BreadCrumbType[]>(() => {
  if (product.value) {
    return [
      { id: 0, title: 'Каталог', link: 'catalog' },
      { id: 1, title: product.value.category.title, link: 'catalog' },
    ];
  } else return [];
});

const loadProduct = async () => {
  const productId = route.params.id;
  const path = `${origin}${productPath}/${productId}`;

  try {
    const res = await axios.get(path);
    product.value = parseProductRes(res.data);
  } catch (err) {
    console.error('err:', err);
  }
};

const updateCounter = (e: number) => {
  qty.value = e;
};

onMounted(() => {
  loadProduct();
});
</script>

<style scoped>
.image {
display: block;
height: 570px;
margin: 0 auto;
}
</style>
