<template>
  <li class="colors__item">
    <label class="colors__label" :for="inputId">
      <input
        :id="inputId"
        class="colors__radio sr-only"
        type="radio"
        :name="name"
        :value="color.id"
        v-model="cmpCurColor"
      />
      <span class="colors__value" :style="{ 'background-color': color.code }">
      </span>
    </label>
  </li>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import type { ColorType } from '@/types/catalogTypes';

type Props = {
  inputId: string;
  name: string;
  curColor: number | null;
  color: ColorType;
};

type Emits = {
  (e: 'update:curColor', value: number | null): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpCurColor = computed({
  get: () => props.curColor,
  set: (value: number | null) => emit('update:curColor', value),
});

</script>
