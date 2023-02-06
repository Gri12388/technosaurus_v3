<template>
  <fieldset class="form__block">
    <legend class="form__legend">Товаров на странице</legend>
    <label class="form__label form__label--select">
      <select class="form__select" name="limit" v-model="cmpCurLimit">
        <option
          v-for="limit in LIMITS"
          :key="limit"
          :value="limit"
          >{{ limit }}</option>
      </select>
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import { LIMITS } from '@/constants/constants';

type Props = {
  curLimit: number;
};

type Emits = {
  (e: 'update:curLimit', value: number): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpCurLimit = computed({
  get: () => props.curLimit,
  set: (value: number) => emit('update:curLimit', value),
});
</script>
