<template>
  <li class="tabs__item" :class="cmpClass" @click="onTabClickHandler">
    <a class="tabs__link ">
      {{ title }}
    </a>
  </li>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
} from 'vue';

type Props = {
  id: number;
  title: string;
  curTabId: number;
};

type Emits = {
  (e: 'update:curTabId', value: number): void,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const cmpClass = computed(() => {
  if (props.id === props.curTabId) return 'tabs__link--current';
  else return '';
});

const onTabClickHandler = () => {
  emit('update:curTabId', props.id);
};
</script>
