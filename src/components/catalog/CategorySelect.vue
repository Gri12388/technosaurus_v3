<template>
  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <label class="form__label form__label--select">
      <select class="form__select" name="category" v-model="cmpCurCategId">
        <option
          v-for="category in cmpCategories"
          :key="category.id"
          :value="category.id"
          >{{ category.title }}</option>
      </select>
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { useStore } from '@/store/store';
import type { CategoryType } from '@/types/types';

type Props = {
  curCategId: number | null;
};

type Emits = {
  (e: 'update:curCategId', value: number | null): void,
};

const store = useStore();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpCategories = computed<CategoryType[]>(() => store.getters.getCategories);
const cmpCurCategId = computed({
  get: () => props.curCategId,
  set: (value: number | null) => emit('update:curCategId', value),
});
</script>
