<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цена</legend>
    <label class="form__label form__label--price">
      <input
        class="form__input"
        type="text"
        name="min-price"
        v-model="priceMin"
      />
      <span class="form__value">От</span>
    </label>
    <label class="form__label form__label--price">
      <input
        class="form__input"
        type="text"
        name="max-price"
        v-model="priceMax"
      />
      <span class="form__value">До</span>
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  ref,
  watch,
} from 'vue';

type Props = {
  priceMin: string | null;
  priceMax: string | null;
}

type Emits = {
  (e: 'updatePriceMin', value: string | null): void;
  (e: 'updatePriceMax', value: string | null): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const priceMin = ref(props.priceMin);
const priceMax = ref(props.priceMax);

watch(props, (value) => {
  if (value.priceMin === null) priceMin.value = null;
  if (value.priceMax === null) priceMax.value = null;
});

watch(priceMin, (value) => {
  const reg = /^\d+$/;
  if (value !== null && reg.test(value)) {
    priceMin.value = value;
    emit('updatePriceMin', value);
  } else priceMin.value = null;
});

watch(priceMax, (value) => {
  const reg = /^\d+$/;
  if (value !== null && reg.test(value)) {
    // priceMax.value = value;
    emit('updatePriceMax', value);
  } else priceMax.value = null;
});

</script>
