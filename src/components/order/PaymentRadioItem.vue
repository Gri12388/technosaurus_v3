<template>
  <li class="options__item">
    <label class="options__label">
      <input
        class="options__radio sr-only"
        type="radio"
        :name="name"
        :value="payment.id"
        v-model="cmpPaymentId"
      >
      <span class="options__value">
        {{ payment.title }}
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

import type { PaymentType } from '@/types/types';

type Props = {
  name: string;
  curPaymentId: number;
  payment: PaymentType;
};

type Emits = {
  (e: 'update:paymentId', value: number): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpPaymentId = computed({
  get: () => props.curPaymentId,
  set: (value: number) => emit('update:paymentId', value),
});

</script>
