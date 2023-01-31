import axios from 'axios';
import { cloneDeep } from 'lodash';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { defaultProdState } from '@/constants/constants';
import {
  accessKeyPath,
  cartPath,
  categoriesPath,
  colorsPath,
  origin,
} from '@/constants/paths';
import { parseAccessKeyObj, parseCartObj } from '@/helpers/parsers/commonParsers';
import { parseCategoriesObj, parseColorsObj } from '@/helpers/parsers/storeParsers';

import type {
  CartItemType,
  CategoryType,
  ColorType,
  ProdStateType,
} from '@/types/types';

export type State = {
  accessKey: string | null;
  categories: CategoryType[];
  colors: ColorType[];
  localCart: CartItemType[];
  prodState: ProdStateType;
  serverCart: CartItemType[];
};

export const key: InjectionKey<Store<State>> = Symbol('key');

export const useStore = () => baseUseStore(key);

export const store = createStore<State>({
  state: {
    accessKey: null,
    categories: [],
    colors: [],
    localCart: [],
    prodState: cloneDeep(defaultProdState),
    serverCart: [],
  },
  getters: {
    getAccessKey: (state) => state.accessKey,
    getCategories: (state) => state.categories,
    getColors: (state) => state.colors,
    getProdState: (state) => state.prodState,
    getTotalProds: (state) => state.localCart.length,
  },
  mutations: {
    dropAccessKey: (state) => {
      state.accessKey = null;
    },
    dropCategories: (state) => {
      state.categories = [];
    },
    dropColors: (state) => {
      state.colors = [];
    },
    dropLocalCart: (state) => {
      state.localCart = [];
    },
    dropProdState: (state) => {
      state.prodState = cloneDeep(defaultProdState);
    },
    dropServerCart(state) {
      state.serverCart = [];
    },
    setAccessKey: (state, payload: { accessKey: string }) => {
      state.accessKey = payload.accessKey;
    },
    setCategories: (state, payload: { categories: CategoryType[] }) => {
      state.categories = payload.categories;
    },
    setColors: (state, payload: { colors: ColorType[] }) => {
      state.colors = payload.colors;
    },
    setLocalCart(state, payload: { localCart: CartItemType[] }) {
      state.localCart = payload.localCart;
    },
    setProdState: (state, payload: { prodState: ProdStateType }) => {
      state.prodState = payload.prodState;
    },
    setServerCart(state, payload: { serverCart: CartItemType[] }) {
      state.serverCart = payload.serverCart;
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
      const path = `${origin}${cartPath}`;
      const config = { params: { userAccessKey: state.accessKey } };
      try {
        const res = await axios.get(path, config);
        const { accessKey, cartItems } = parseCartObj(res.data);
        commit('setServerCart', { serverCart: cartItems });
        commit('syncCarts');
        if (!state.accessKey) {
          commit('setAccessKey', { accessKey });
          localStorage.setItem('accessKey', accessKey);
        }
      } catch (err) {
        console.error(err);
      }
    },
    loadCategories: async ({ commit }) => {
      const path = `${origin}${categoriesPath}`;
      try {
        const res = await axios.get(path);
        const categories = parseCategoriesObj(res.data);
        commit('setCategories', { categories });
      } catch (err) {
        console.error(err);
      }
    },
    loadColors: async ({ commit }) => {
      const path = `${origin}${colorsPath}`;
      try {
        const res = await axios.get(path);
        const colors = parseColorsObj(res.data);
        commit('setColors', { colors });
      } catch (err) {
        console.error(err);
      }
    },
  },
});
