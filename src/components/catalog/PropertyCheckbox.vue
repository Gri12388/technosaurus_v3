<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ property.title }}</legend>
    <ul class="check-list">
      <PropertyCheckboxItem
        v-for="value in property.values"
        :key="value.value"
        :name="`${property.code}_${value.value}`"
        :input-id="`${property.code}_${value.value}`"
        :value="value"
        v-model:cur-properties="curProperties"
      />
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  ref,
  Ref,
  watch,
} from 'vue';

import PropertyCheckboxItem from '@/components/catalog/PropertyCheckboxItem.vue';

import type { PropertyType } from '@/types/types';

type Props = {
  property: PropertyType;
};

type Emits = {
  (e: 'updateCurProperties', value: { [index: string]: string[] }): void,
};

const curProperties: Ref<string[]> = ref([]);

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

watch(curProperties, () => {
  emit('updateCurProperties', { [props.property.code]: curProperties.value });
});
</script>
