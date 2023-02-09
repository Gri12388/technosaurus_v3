<template>
  <div class="form__counter border">
    <button
      type="button"
      aria-label="Убрать один товар"
      :disabled="cmpIsLoading"
      @click="decreaseCounterByOne"
    >
      <svg width="12" height="12" fill="#000">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <label for="counter">
      <input
        id="counter"
        type="text"
        name="count"
        :disabled="cmpIsLoading"
        v-model="counter"
      />
    </label>
    <button
      type="button"
      aria-label="Добавить один товар"
      :disabled="cmpIsLoading"
      @click="increaseCounterByOne"
    >
      <svg width="12" height="12" fill="#000">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  defineEmits,
  ref,
  watch,
} from 'vue';

import { useStore } from '@/store/store';

type Props = {
  qty: number;
};

type Emits = {
  (e: 'updateCounter', value: number): void;
};

const store = useStore();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const counter = ref(props.qty.toString());

const cmpIsLoading = computed(() => store.getters.getLoading > 0);

const decreaseCounterByOne = () => {
  const num = +counter.value;
  counter.value = (num - 1).toString();
};

const increaseCounterByOne = () => {
  const num = +counter.value;
  counter.value = (num + 1).toString();
};

watch(counter, (value) => {
  const reg = /^\d+$/;
  const num = +value;
  if (reg.test(value) && num > 0) emit('updateCounter', num);
  else {
    counter.value = '1';
    emit('updateCounter', 1);
  }
});

watch(props, (value) => {
  const qty = value.qty.toString();
  if (qty !== counter.value) counter.value = qty;
});
</script>

<style scoped>
.border {
  border: solid 1px #000;
}
</style>
