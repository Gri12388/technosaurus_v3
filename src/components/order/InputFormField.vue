<template>
  <FormField :error="error" :title="title">
    <input
      class="form__input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      v-model="cmpValue"
      ref="el"
    >
  </FormField>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  defineEmits,
  ref,
} from 'vue';

import FormField from '@/components/order/FormField.vue';

type Props = {
  type: string;
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

const el = ref<HTMLInputElement | null>(null);

const cmpValue = computed({
  get: () => props.value,
  set: (value: string) => {
    const regexps = [/^$/, /^[+\d]$/, /^[+\d][\d]{0,15}$/];
    if (props.type !== 'tel') emit('update:value', value);
    else if (regexps.find((item) => item.test(value))) {
      let valueCopy = value;
      if (!regexps[0].test(valueCopy) && valueCopy[0] !== '+') valueCopy = `+${valueCopy}`;
      emit('update:value', valueCopy);
    } else if (el.value) el.value.value = props.value;
  },
});
</script>
