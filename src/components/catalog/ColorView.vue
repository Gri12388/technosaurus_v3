<template>
  <li class="colors__item">
    <label class="colors__label" :for="inputId">
      <input
        :id="inputId"
        class="colors__radio sr-only"
        type="radio"
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
  curColorId: number | null;
  color: ColorType;
};

type Emits = {
  (e: 'update:curColorId', value: number | null): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpCurColorId = computed({
  get: () => props.curColorId,
  set: (value: number | null) => emit('update:curColorId', value),
});

</script>
