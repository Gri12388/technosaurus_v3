<template>
  <main class="content container" :class="cmpFallbackClass">
    <ErrorAlert :error="addProductError" @drop-error="dropAddProductError" />
    <ErrorAlert :error="loadProductError" @drop-error="dropLoadProductError" />
    <SuccessDialog :is-opened="isDialogOpened" />

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
        <div class="item__form" v-if="product">
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
                :qty="qty"
                @update-counter="updateCounter"
              />

              <button
                class="button button--primery"
                :disabled="cmpIsLoading"
                @click.prevent="addProduct"
              >
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
import axios, { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
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
import ErrorAlert from '@/components/common/ErrorAlert.vue';
import ProductInfo from '@/components/product/ProductInfo.vue';
import PropertyRadioItem from '@/components/catalog/PropertyRadioItem.vue';
import SuccessDialog from '@/components/product/SuccessDialog.vue';

import { COLOR_PROP_ID, defaultError } from '@/constants/constants';
import { origin, productPath } from '@/constants/paths';
import {
  initCurColorId,
  initCurOfferId,
  initCurPrice,
  initCurTitle,
} from '@/helpers/initers';
import { formatColors, formatNumber } from '@/helpers/formatters';
import { addProductRequest } from '@/helpers/requesters';
import { handleAxiosError } from '@/helpers/handlers';
import { parseProductObj } from '@/helpers/parsers';
import { useStore } from '@/store/store';

import type {
  BreadCrumbType,
  ErrorType,
  ProdStateType,
  ProductType,
} from '@/types/types';

const route = useRoute();
const store = useStore();

const isDialogOpened = ref(false);

const addProductError: Ref<ErrorType> = ref(cloneDeep(defaultError));
const loadProductError: Ref<ErrorType> = ref(cloneDeep(defaultError));

const product: Ref<ProductType | null> = ref(null);
const qty = ref(1);

const curOfferId: Ref<number | null> = ref(null);
const curColorId: Ref<number | null> = ref(null);
const curPrice: Ref<number | null> = ref(null);
const curTitle: Ref<string | null> = ref(null);

const cmpFallbackClass = computed(() => {
  if (!product.value) return 'h-75';
  return '';
});

const cmpIsLoading = computed(() => store.getters.getLoading > 0);
const cmpBreadCrumbsArr = computed<BreadCrumbType[]>(() => {
  if (product.value && curTitle.value) {
    return [
      { id: 0, title: 'Каталог', link: 'catalog' },
      { id: 1, title: product.value.category.title, link: 'catalog' },
      { id: 2, title: curTitle.value },
    ];
  } else return [{ id: 0, title: 'Вернуться в каталог', link: 'catalog' }];
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

const cmpAccessKey = computed<string | null>(() => store.getters.getAccessKey);
const cmpProdState = computed<ProdStateType>(() => store.getters.getProdState);

const loadProduct = async () => {
  try {
    store.commit('setLoadingUp');
    const { productId } = route.params;
    const path = `${origin}${productPath}/${productId}`;
    const res = await axios.get(path);
    const temp = parseProductObj(res.data);
    if (temp.mainProp.id === COLOR_PROP_ID) {
      temp.colors = formatColors(temp.colors, temp.offers);
    }
    product.value = temp;
  } catch (err) {
    const errorTitle = 'Не удалось загрузить данные о товаре.';
    if (err instanceof AxiosError) loadProductError.value = handleAxiosError(err, errorTitle);
    else if (err instanceof Error) {
      console.error('err:', err);
      loadProductError.value = { isError: true, errorMessage: err.message, errorTitle };
    }
  } finally {
    store.commit('setLoadingDown');
  }
};

const addProduct = async () => {
  try {
    store.commit('setLoadingUp');
    if (cmpCurOfferId.value && cmpCurColorId.value && cmpAccessKey.value) {
      const params = {
        accessKey: cmpAccessKey.value,
        curColorId: cmpCurColorId.value,
        curOfferId: cmpCurOfferId.value,
        qty: qty.value,
      };
      const { cartItems } = await addProductRequest(params);
      store.commit('setServerCart', { serverCart: cartItems });
      store.commit('syncCarts');
      qty.value = 1;
      isDialogOpened.value = true;
    } else throw new Error('Either variabele "offerId" or variable "colorId" or variable "accessKey" is absent');
  } catch (err) {
    const errorTitle = 'Товар не был добавлен в корзину.';
    if (err instanceof AxiosError) loadProductError.value = handleAxiosError(err, errorTitle);
    else if (err instanceof Error) {
      console.error('err:', err);
      loadProductError.value = { isError: true, errorMessage: err.message, errorTitle };
    }
  } finally {
    store.commit('setLoadingDown');
  }
};

const updateCounter = (e: number) => {
  qty.value = e;
};

const dropAddProductError = () => {
  addProductError.value = cloneDeep(defaultError);
};

const dropLoadProductError = () => {
  loadProductError.value = cloneDeep(defaultError);
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
