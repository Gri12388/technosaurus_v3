<template>
  <FormField :error="error" :title="title">
    <textarea
      class="form__input"
      :name="name"
      :placeholder="placeholder"
      v-model="cmpValue"
    ></textarea>
  </FormField>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  defineEmits,
} from 'vue';

import FormField from '@/components/order/FormField.vue';

type Props = {
  name: string;
  placeholder: string;
  title: string;
  error: string;
  value: string;
}

type Emits = {
  (e: 'update:value', value: string): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpValue = computed({
  get: () => props.value,
  set: (value: string) => emit('update:value', value),
});
</script>
