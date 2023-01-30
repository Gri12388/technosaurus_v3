<template>
  <li class="tabs__item" :class="cmpClass" @click="onTabClickHandler">
    <p class="tabs__link pointer">
      {{ title }}
    </p>
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

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
