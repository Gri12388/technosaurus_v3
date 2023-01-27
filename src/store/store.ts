import { categoriesPath, origin } from '@/constants/paths';
import { parseCategories } from '@/helpers/parsers';
import { CategoryType } from '@/types/storeTypes';
import axios from 'axios';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export type State = {
  categories: CategoryType[];
};

export const key: InjectionKey<Store<State>> = Symbol('key');

export const useStore = () => baseUseStore(key);

export const store = createStore<State>({
  state: {
    categories: [],
  },
  getters: {
    getCategories: (state) => state.categories,
  },
  mutations: {
    dropCategories: (state) => {
      state.categories = [];
    },
    setCategories: (state, payload: { categories: CategoryType[] }) => {
      state.categories = payload.categories;
    },
  },
  actions: {
    loadCategories: async ({ commit }) => {
      const path = `${origin}${categoriesPath}`;
      try {
        const res = await axios.get(path);
        const categories = parseCategories(res.data);
        commit('setCategories', { categories });
      } catch (err) {
        console.error(err);
      }
    },
  },
});
