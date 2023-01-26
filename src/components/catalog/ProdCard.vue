<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="card.image" alt="curTitle" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ curTitle }} </a>
    </h3>

    <span class="catalog__price"> {{ cmpPrice }} ₽ </span>

    <ul class="colors colors--black">
      <ColorView
        v-for="color in card.colors"
        :key="`${card.id}_${color.id}`"
        :input-id="`${card.id}_${color.id}`"
        :name="card.id.toString()"
        :color="color"
        v-model:cur-color="cmpCurColor"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';

import ColorView from '@/components/catalog/ColorView.vue';

import { formatNumber } from '@/helpers/formatters';
import { initCurColor, initCurPrice, initCurTitle } from '@/helpers/helpers';

import type { ProdCardType } from '@/types/catalogTypes';
import { COLOR_PROP_ID } from '@/constants/constants';

type Props = {
  card: ProdCardType;
}

const props = defineProps<Props>();

const curColor = ref(initCurColor(props.card));
const curTitle = ref(initCurTitle(props.card));
const curPrice = ref(initCurPrice(props.card));

const cmpCurColor = computed({
  get: () => curColor.value,
  set: (value: number | null) => {
    if (props.card.mainProp.id === COLOR_PROP_ID && value) {
      const found = props.card.colors.find((item) => item.id === value);
      if (found && found.offer) {
        curTitle.value = found.offer.title;
        curPrice.value = found.offer.price;
      }
    }
    return value;
  },
});

const cmpPrice = computed(() => {
  if (typeof curPrice.value === 'number') return formatNumber(curPrice.value);
  else return curPrice.value;
});
</script>
