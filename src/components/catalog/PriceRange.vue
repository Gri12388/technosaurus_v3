<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цена</legend>
    <label class="form__label form__label--price">
      <input
        class="form__input"
        type="text"
        name="min-price"
        v-model="cmpPriceMin"
      />
      <span class="form__value">От</span>
    </label>
    <label class="form__label form__label--price">
      <input
        class="form__input"
        type="text"
        name="max-price"
        v-model="cmpPriceMax"
      />
      <span class="form__value">До</span>
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

type Props = {
  priceMin: number | null;
  priceMax: number | null;
}

type Emits = {
  (e: 'update:priceMin', value: number | null): void;
  (e: 'update:priceMax', value: number | null): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpPriceMin = computed({
  get: () => props.priceMin,
  set: (value: number | null) => emit('update:priceMin', value),
});

const cmpPriceMax = computed({
  get: () => props.priceMax,
  set: (value: number | null) => emit('update:priceMax', value),
});

</script>
