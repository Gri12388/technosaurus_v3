<template>
  <li class="options__item">
    <label class="options__label">
      <input
        class="options__radio sr-only"
        type="radio"
        :name="name"
        :value="delivery.id"
        v-model="cmpDeliveryId"
      >
      <span class="options__value">
        {{ delivery.title }} <b>{{ cmpDeliveryPrice }}</b>
      </span>
    </label>
  </li>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
} from 'vue';

import { FREE } from '@/constants/constants';

import type { DeliveryType } from '@/types/types';

type Props = {
  name: string;
  curDeliveryId: number;
  delivery: DeliveryType;
};

type Emits = {
  (e: 'update:deliveryId', value: number): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpDeliveryId = computed({
  get: () => props.curDeliveryId,
  set: (value: number) => emit('update:deliveryId', value),
});

const cmpDeliveryPrice = computed(() => {
  if (props.delivery.price === '0') return FREE;
  else return props.delivery.price;
});
</script>
