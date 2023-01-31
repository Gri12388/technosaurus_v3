<template>
  <li>
    <h3>{{ spec.title }}</h3>
    <p>{{ spec.value }}</p>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import type { SpecificationType } from '@/types/types';

type Props = {
  spec: SpecificationType;
}

defineProps<Props>();
</script>
