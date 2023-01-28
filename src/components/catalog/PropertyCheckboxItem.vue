<template>
  <li class="check-list__item">
    <label class="check-list__label" :for="inputId">
      <input
        :id="inputId"
        class="check-list__check sr-only"
        type="checkbox"
        :name="name"
        :value="value.value"
        v-model="cmpCurProperties"
      />
      <span class="check-list__desc">
        {{ value.value }}
        <span>({{ value.count }})</span>
      </span>
    </label>
  </li>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import type { PropertyValueType } from '@/types/types';

type Props = {
  inputId: string;
  name: string;
  curProperties: string[];
  value: PropertyValueType;
};

type Emits = {
  (e: 'update:curProperties', value: string[]): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpCurProperties = computed({
  get: () => props.curProperties,
  set: (value: string[]) => emit('update:curProperties', value),
});
</script>
