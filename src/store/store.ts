import { defaultProdState } from '@/constants/constants';
import { categoriesPath, colorsPath, origin } from '@/constants/paths';
import { parseCategoriesObj, parseColorsObj } from '@/helpers/parsers/storeParsers';
import { CategoryType, ColorType, ProdStateType } from '@/types/types';
import axios from 'axios';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export type State = {
  categories: CategoryType[];
  colors: ColorType[];
  prodState: ProdStateType;
};

export const key: InjectionKey<Store<State>> = Symbol('key');

export const useStore = () => baseUseStore(key);

export const store = createStore<State>({
  state: {
    categories: [],
    colors: [],
    prodState: defaultProdState,
  },
  getters: {
    getCategories: (state) => state.categories,
    getColors: (state) => state.colors,
    getProdState: (state) => state.prodState,
  },
  mutations: {
    dropCategories: (state) => {
      state.categories = [];
    },
    dropColors: (state) => {
      state.colors = [];
    },
    dropProdState: (state) => {
      state.prodState = defaultProdState;
    },
    setCategories: (state, payload: { categories: CategoryType[] }) => {
      state.categories = payload.categories;
    },
    setColors: (state, payload: { colors: ColorType[] }) => {
      state.colors = payload.colors;
    },
    setProdState: (state, payload: { prodState: ProdStateType }) => {
      state.prodState = payload.prodState;
    },
  },
  actions: {
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
