<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
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
        v-model="counter"
      />
    </label>
    <button
      type="button"
      aria-label="Добавить один товар"
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
  defineEmits,
  ref,
  Ref,
  watch,
} from 'vue';

type Emits = {
  (e: 'updateCounter', value: number): void;
};

const emit = defineEmits<Emits>();

const counter: Ref<string> = ref('1');

const increaseCounterByOne = () => {
  const num = +counter.value;
  counter.value = (num + 1).toString();
};

const decreaseCounterByOne = () => {
  const num = +counter.value;
  counter.value = (num - 1).toString();
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
</script>
