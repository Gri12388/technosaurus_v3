import axios, { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { defaultError, defaultOrderInfo, defaultProdState } from '@/constants/constants';
import {
  accessKeyPath,
  cartPath,
  categoriesPath,
  colorsPath,
  origin,
} from '@/constants/paths';
import {
  parseAccessKeyObj,
  parseCartObj,
  parseCategoriesObj,
  parseColorsObj,
} from '@/helpers/parsers';

import type {
  CartItemType,
  CategoryType,
  ColorType,
  ErrorType,
  OrderInfoType,
  ProdStateType,
} from '@/types/types';
import { handleAxiosError } from '@/helpers/handlers';

export type State = {
  accessKey: string | null;
  categories: CategoryType[];
  categoriesError: ErrorType;
  colors: ColorType[];
  colorsError: ErrorType;
  localCart: CartItemType[];
  orderInfo: OrderInfoType;
  prodState: ProdStateType;
  serverCart: CartItemType[];
  serverCartError: ErrorType;
};

export const key: InjectionKey<Store<State>> = Symbol('key');

export const useStore = () => baseUseStore(key);

export const store = createStore<State>({
  state: {
    accessKey: null,
    categories: [],
    categoriesError: cloneDeep(defaultError),
    colors: [],
    colorsError: cloneDeep(defaultError),
    localCart: [],
    orderInfo: cloneDeep(defaultOrderInfo),
    prodState: cloneDeep(defaultProdState),
    serverCart: [],
    serverCartError: cloneDeep(defaultError),
  },
  getters: {
    getAccessKey: (state) => state.accessKey,
    getCategories: (state) => state.categories,
    getCategoriesError: (state) => state.categoriesError,
    getColors: (state) => state.colors,
    getColorsError: (state) => state.colorsError,
    getLocalCart: (state) => state.localCart,
    getOrderInfo: (state) => state.orderInfo,
    getProdState: (state) => state.prodState,
    getServerCartError: (state) => state.serverCartError,
    getTotalPrice: (state) => state.localCart.reduce((acc: number, item) => item.offer.price * item.qty + acc, 0),
    getTotalProds: (state) => state.localCart.length,
  },
  mutations: {
    dropAccessKey: (state) => {
      state.accessKey = null;
    },
    dropCategories: (state) => {
      state.categories = [];
    },
    dropCategoriesError: (state) => {
      state.categoriesError = cloneDeep(defaultError);
    },
    dropColors: (state) => {
      state.colors = [];
    },
    dropColorsError: (state) => {
      state.colorsError = cloneDeep(defaultError);
    },
    dropLocalCart: (state) => {
      state.localCart = [];
    },
    dropOrderInfo: (state) => {
      state.orderInfo = cloneDeep(defaultOrderInfo);
    },
    dropProdState: (state) => {
      state.prodState = cloneDeep(defaultProdState);
    },
    dropServerCart(state) {
      state.serverCart = [];
    },
    dropServerCartError: (state) => {
      state.serverCartError = cloneDeep(defaultError);
    },
    setAccessKey: (state, payload: { accessKey: string }) => {
      state.accessKey = payload.accessKey;
    },
    setCategories: (state, payload: { categories: CategoryType[] }) => {
      state.categories = payload.categories;
    },
    setCategoriesError: (state, payload: { categoriesError: ErrorType }) => {
      state.categoriesError = payload.categoriesError;
    },
    setColors: (state, payload: { colors: ColorType[] }) => {
      state.colors = payload.colors;
    },
    setColorsError: (state, payload: { colorsError: ErrorType }) => {
      state.colorsError = payload.colorsError;
    },
    setLocalCart(state, payload: { localCart: CartItemType[] }) {
      state.localCart = payload.localCart;
    },
    setLocalCartItemQty(state, payload: { id: number, qty: number }) {
      const found = state.localCart.find((item) => item.id === payload.id);
      if (found) found.qty = payload.qty;
    },
    setOrderInfo: (state, payload: { orderInfo: OrderInfoType }) => {
      state.orderInfo = payload.orderInfo;
    },
    setProdState: (state, payload: { prodState: ProdStateType }) => {
      state.prodState = payload.prodState;
    },
    setServerCart(state, payload: { serverCart: CartItemType[] }) {
      state.serverCart = payload.serverCart;
    },
    setServerCartError: (state, payload: { serverCartError: ErrorType }) => {
      state.serverCartError = payload.serverCartError;
    },
    syncCarts(state) {
      state.localCart = cloneDeep(state.serverCart);
    },
  },
  actions: {
    loadAccessKey: async ({ commit }) => {
      const path = `${origin}${accessKeyPath}`;
      try {
        const res = await axios.get(path);
        const accessKey = parseAccessKeyObj(res);
        commit('setAccessKey', { accessKey });
      } catch (err) {
        console.error(err);
      }
    },
    loadCart: async ({ commit, state }) => {
      try {
        commit('dropServerCartError');
        const path = `${origin}${cartPath}1`;
        const config = { params: { userAccessKey: state.accessKey } };
        const res = await axios.get(path, config);
        const { accessKey, cartItems } = parseCartObj(res.data);
        commit('setServerCart', { serverCart: cartItems });
        commit('syncCarts');
        if (!state.accessKey) {
          commit('setAccessKey', { accessKey });
          localStorage.setItem(`${origin}${cartPath}`, accessKey);
        }
      } catch (err) {
        const errorTitle = 'Не удалось загрузить содержимое корзины.';
        if (err instanceof AxiosError) {
          const serverCartError = handleAxiosError(err, errorTitle);
          commit('setServerCartError', { serverCartError });
        } else if (err instanceof Error) {
          console.error('err:', err);
          const serverCartError = { isError: true, errorMessage: err.message, errorTitle };
          commit('setServerCartError', { serverCartError });
        }
      }
    },
    loadCategories: async ({ commit }) => {
      try {
        commit('dropCategoriesError');
        const path = `${origin}${categoriesPath}1`;
        const res = await axios.get(path);
        const categories = parseCategoriesObj(res.data);
        commit('setCategories', { categories });
      } catch (err) {
        const errorTitle = 'Не удалось загрузить список категорий товаров.';
        if (err instanceof AxiosError) {
          const categoriesError = handleAxiosError(err, errorTitle);
          commit('setCategoriesError', { categoriesError });
        } else if (err instanceof Error) {
          console.error('err:', err);
          const categoriesError = { isError: true, errorMessage: err.message, errorTitle };
          commit('setCategoriesError', { categoriesError });
        }
      }
    },
    loadColors: async ({ commit }) => {
      try {
        commit('dropColorsError');
        const path = `${origin}${colorsPath}1`;
        const res = await axios.get(path);
        const colors = parseColorsObj(res.data);
        commit('setColors', { colors });
      } catch (err) {
        const errorTitle = 'Не удалось загрузить цветовую палитру товаров.';
        if (err instanceof AxiosError) {
          const colorsError = handleAxiosError(err, errorTitle);
          commit('setColorsError', { colorsError });
        } else if (err instanceof Error) {
          console.error('err:', err);
          const colorsError = { isError: true, errorMessage: err.message, errorTitle };
          commit('setColorsError', { colorsError });
        }
      }
    },
  },
});
