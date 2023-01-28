<template>
  <li class="colors__item">
    <label class="colors__label" :for="inputId">
      <input
        :id="inputId"
        class="colors__radio sr-only"
        type="checkbox"
        :name="name"
        :value="color.id"
        v-model="cmpCurColorId"
      />
      <span class="colors__value" :style="{ 'background-color': color.code }">
      </span>
    </label>
  </li>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import type { ColorType } from '@/types/types';

type Props = {
  inputId: string;
  name: string;
  curColorsIds: number[];
  color: ColorType;
};

type Emits = {
  (e: 'update:curColorsIds', value: number[]): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpCurColorId = computed({
  get: () => props.curColorsIds,
  set: (value: number[]) => emit('update:curColorsIds', value),
});

</script>
