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
      </div>

      <div class="item__info">
        <span v-if="product" class="item__code">Артикул: {{ curOfferId }}</span>
        <h2 class="item__title" v-if="product">
          {{ curTitle }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price" v-if="product">
              {{ cmpCurPrice }} ₽
            </b>

            <fieldset class="form__block" v-if="product">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <ColorRadioItem
                  v-for="color in product.colors"
                  :key="color.id"
                  :inputId="color.id.toString()"
                  :color="color"
                  name="productColor"
                  v-model:cur-color-id="cmpCurColorId"
                />
              </ul>
            </fieldset>

            <fieldset class="form__block" v-if="product">
              <legend class="form__legend">{{ product.mainProp.title }}</legend>
              <ul class="mainPropList">
                <PropertyRadioItem
                  v-for="offer in product.offers"
                  :key="offer.id"
                  :input-id="offer.id.toString()"
                  :main-prop-id="product.mainProp.id"
                  :offer="offer"
                  name="mainProp"
                  v-model:cur-offer-id="cmpCurOfferId"
                />
              </ul>
            </fieldset>

            <div class="item__row">
              <CounterView
                @update-counter="updateCounter"
              />

              <button class="button button--primery" @click.prevent="addProduct">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <ProductInfo
        v-if="product"
        :content="product.content"
        :specifications="product.specifications"
      />

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
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
import ColorRadioItem from '@/components/common/ColorRadioItem.vue';
import CounterView from '@/components/common/CounterView.vue';
import ProductInfo from '@/components/product/ProductInfo.vue';
import PropertyRadioItem from '@/components/catalog/PropertyRadioItem.vue';

import { COLOR_PROP_ID } from '@/constants/constants';
import { cartProdsPath, origin, productPath } from '@/constants/paths';
import { formatColors, formatNumber } from '@/helpers/formatters';
import {
  initCurColorId,
  initCurOfferId,
  initCurPrice,
  initCurTitle,
} from '@/helpers/helpers';
import { parseProductObj } from '@/helpers/parsers/productParsers';
import { useStore } from '@/store/store';

import type { BreadCrumbType, ProdStateType, ProductType } from '@/types/types';

const route = useRoute();
const store = useStore();

const product: Ref<ProductType | null> = ref(null);
const qty = ref(1);
const curOfferId: Ref<number | null> = ref(null);
const curColorId: Ref<number | null> = ref(null);
const curPrice: Ref<number | null> = ref(null);
const curTitle: Ref<string | null> = ref(null);

const cmpBreadCrumbsArr = computed<BreadCrumbType[]>(() => {
  if (product.value && curTitle.value) {
    return [
      { id: 0, title: 'Каталог', link: 'catalog' },
      { id: 1, title: product.value.category.title, link: 'catalog' },
      { id: 2, title: curTitle.value },
    ];
  } else return [];
});
const cmpCurPrice = computed(() => {
  if (curPrice.value) return formatNumber(curPrice.value);
  else return null;
});
const cmpCurColorId = computed({
  get: () => curColorId.value,
  set: (value: number | null) => {
    if (product.value && product.value.mainProp.id === COLOR_PROP_ID && value) {
      const found = product.value.colors.find((item) => item.id === value);
      if (found && found.offer) {
        curTitle.value = found.offer.title;
        curPrice.value = found.offer.price;
      }
    }

    curColorId.value = value;
  },
});
const cmpCurOfferId = computed({
  get: () => curOfferId.value,
  set: (value: number | null) => {
    if (product.value && product.value.mainProp.id !== COLOR_PROP_ID && value) {
      const found = product.value.offers.find((item) => item.id === value);
      if (found) {
        curTitle.value = found.title;
        curPrice.value = found.price;
      }
    }
    curOfferId.value = value;
  },
});
const cmpProdState = computed<ProdStateType>(() => store.getters.getProdState);
const cmpAccessKey = computed<string | null>(() => store.getters.getAccessKey);

const loadProduct = async () => {
  const { productId } = route.params;
  const path = `${origin}${productPath}/${productId}`;

  try {
    const res = await axios.get(path);
    const temp = parseProductObj(res.data);
    if (temp.mainProp.id === COLOR_PROP_ID) {
      temp.colors = formatColors(temp.colors, temp.offers);
    }
    product.value = temp;
  } catch (err) {
    console.error('err:', err);
  }
};

const addProduct = async () => {
  try {
    if (cmpCurOfferId.value && cmpCurColorId.value && cmpAccessKey.value) {
      const path = `${origin}${cartProdsPath}`;
      const config = { params: { userAccessKey: cmpAccessKey.value } };
      const data = { productOfferId: cmpCurOfferId.value, colorId: cmpCurColorId.value, quantity: qty.value };
      const res = await axios.post(path, data, config);
      console.log('res', res.data);
    } else throw new Error('Either variabele "offerId" or variable "colorId" or variable "accessKey" is absent');
  } catch (err) {
    console.error(err);
  }
};

const updateCounter = (e: number) => {
  qty.value = e;
};

onMounted(() => {
  loadProduct();
});

watch(product, () => {
  if (product.value) {
    if (cmpProdState.value.curOfferId) curOfferId.value = cmpProdState.value.curOfferId;
    else curOfferId.value = initCurOfferId(product.value);

    if (cmpProdState.value.curColorId) curColorId.value = cmpProdState.value.curColorId;
    else curColorId.value = initCurColorId(product.value);

    if (cmpProdState.value.curPrice) curPrice.value = cmpProdState.value.curPrice;
    else curPrice.value = initCurPrice(product.value);

    if (cmpProdState.value.curTitle) curTitle.value = cmpProdState.value.curTitle;
    else curTitle.value = initCurTitle(product.value);
  }
});
</script>

<style scoped>
.image {
display: block;
height: 570px;
margin: 0 auto;
}
</style>
