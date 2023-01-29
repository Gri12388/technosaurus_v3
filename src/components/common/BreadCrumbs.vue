<template>
  <ul class="breadcrumbs">
    <li
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.id"
      class="breadcrumbs__item"
    >
      <router-link
        v-if="breadcrumb.link"
        class="breadcrumbs__link"
        :to="{ name: breadcrumb.link }"
      >
        {{ breadcrumb.title }}
      </router-link>
      <span v-else class="breadcrumbs__link">
        {{ breadcrumb.title }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { BreadCrumbType } from '@/types/types';

type Props = {
  breadcrumbs: BreadCrumbType[];
};

defineProps<Props>();
</script>
