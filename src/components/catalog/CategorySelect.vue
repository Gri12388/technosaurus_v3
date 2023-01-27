<template>
  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <label class="form__label form__label--select">
      <select class="form__select" name="category" v-model="cmpCurCateg">
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
import type { CategoryType } from '@/types/storeTypes';

type Props = {
  curCateg: number | null;
};

type Emits = {
  (e: 'update:curCateg', value: number | null): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const store = useStore();

const cmpCategories = computed<CategoryType[]>(() => store.getters.getCategories);
const cmpCurCateg = computed({
  get: () => props.curCateg,
  set: (value: number | null) => emit('update:curCateg', value),
});
</script>
