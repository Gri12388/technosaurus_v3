<template>
  <v-app>
    <v-main>
      <HeaderView />

      <LinearLoadingIndicatior :is-loading="cmpIsLoading" />
      <ErrorAlert :error="cmpCategoriesError" />
      <ErrorAlert :error="cmpColorsError" />
      <ErrorAlert :error="cmpServerCartError" />
      <v-sheet :class="cmpFallbackHeight" v-if="!cmpIsRouterVeiwShown"></v-sheet>

      <router-view v-if="cmpIsRouterVeiwShown"/>

      <FooterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  Ref,
} from 'vue';

import ErrorAlert from '@/components/common/ErrorAlert.vue';
import FooterView from '@/components/common/FooterView.vue';
import HeaderView from '@/components/common/HeaderView.vue';
import LinearLoadingIndicatior from '@/components/common/LinearLoadIndicator.vue';

import { cartPath, origin } from '@/constants/paths';
import { useStore } from '@/store/store';

import type { ErrorType } from '@/types/types';

const store = useStore();

const cmpIsLoading = computed(() => store.getters.getLoading > 0);

const cmpCategoriesError: Ref<ErrorType> = computed(() => store.getters.getCategoriesError);
const cmpColorsError: Ref<ErrorType> = computed(() => store.getters.getColorsError);
const cmpServerCartError: Ref<ErrorType> = computed(() => store.getters.getServerCartError);

const cmpIsRouterVeiwShown = computed(() => !cmpCategoriesError.value.isError
  && !cmpColorsError.value.isError
  && !cmpServerCartError.value.isError);

const cmpFallbackHeight = computed(() => {
  const alerts = [
    cmpCategoriesError.value.isError,
    cmpColorsError.value.isError,
    cmpServerCartError.value.isError,
  ].filter((item) => item);

  if (alerts.length > 2) return 'h-25';
  else return 'h-50';
});

onMounted(() => {
  store.dispatch('loadCategories');
  store.dispatch('loadColors');
  const accessKey = localStorage.getItem(`${origin}${cartPath}`);
  if (accessKey) store.commit('setAccessKey', { accessKey });
  store.dispatch('loadCart');
});

</script>

<style scoped>
.fallback {
  height: 6px;
}
</style>
