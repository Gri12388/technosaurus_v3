<template>
  <v-app>
    <v-main>
      <HeaderView />
      <router-view/>
      <FooterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import FooterView from '@/components/common/FooterView.vue';
import HeaderView from '@/components/common/HeaderView.vue';

import { useStore } from '@/store/store';

const store = useStore();

onMounted(() => {
  store.dispatch('loadCategories');
  store.dispatch('loadColors');
  const accessKey = localStorage.getItem('accessKey');
  if (accessKey) store.commit('setAccessKey', { accessKey });
});

</script>
