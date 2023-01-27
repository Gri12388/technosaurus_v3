<template>
  <li v-if="mainPropId !== COLOR_PROP_ID">
    <input
      :id="inputId"
      type="radio"
      :name="name"
      :value="offer.id"
      v-model="cmpCurOfferId"
    />
    <label :for="inputId" class="label">{{ offer.value }}</label>
  </li>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import { COLOR_PROP_ID } from '@/constants/constants';

import type { OfferType } from '@/types/types';

type Props = {
  inputId: string;
  name: string;
  mainPropId: number;
  curOfferId: number | null;
  offer: OfferType;
};

type Emits = {
  (e: 'update:curOfferId', value: number | null): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpCurOfferId = computed({
  get: () => props.curOfferId,
  set: (value: number | null) => emit('update:curOfferId', value),
});

</script>

<style>
.label {
  margin-left: 4px;
  margin-right: 8px;
}
</style>
