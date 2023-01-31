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
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  ref,
} from 'vue';

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
