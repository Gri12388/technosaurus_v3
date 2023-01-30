<template>
  <div class="item__desc">
    <ul class="tabs">
      <TabView
        v-for="tab in TABS"
        :key="tab.id"
        :id="tab.id"
        :title="tab.title"
        v-model:cur-tab-id="cmpCurTabId"
      />
    </ul>
    <div class="item__content">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import TabView from '@/components/product/TabView.vue';

import { TABS } from '@/constants/constants';

const curTabId = ref(0);

const cmpCurTabId = computed({
  get: () => curTabId.value,
  set: (value: number) => curTabId.value = value,
})
</script>
