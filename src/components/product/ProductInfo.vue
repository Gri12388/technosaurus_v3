<template>
  <div class="item__desc">
    <ul class="tabs">
      <TabView
        v-for="tab in TABS"
        :key="tab.id"
        :id="tab.id"
        :title="tab.title"
        v-model:cur-tab-id="curTabId"
      />
    </ul>
    <div class="item__content" v-if="curTabId === TABS[0].id">
      {{ cmpContent }}
    </div>
    <ul class="item__content list" v-if="curTabId === TABS[1].id">
      <SpecItem
        v-for="spec in specifications"
        :key="spec.id"
        :spec="spec"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  ref,
} from 'vue';

import SpecItem from '@/components/product/SpecItem.vue';
import TabView from '@/components/product/TabView.vue';

import { LOREM, TABS } from '@/constants/constants';

import type { SpecificationType } from '@/types/types';

type Props = {
  content: string;
  specifications: SpecificationType[];
}

const props = defineProps<Props>();

const curTabId = ref(0);

const cmpContent = computed(() => {
  if (props.content) return props.content;
  else return LOREM;
});
</script>

<style scoped>
.list {
  list-style-type: none;
}
</style>
