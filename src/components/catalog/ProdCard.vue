<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="card.image" alt="curTitle" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ curTitle }} </a>
    </h3>

    <span class="catalog__price"> {{ formattedPrice }} ₽ </span>

    <!-- <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#73B6EA" checked="" />
          <span class="colors__value" style="background-color: #73b6ea">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#8BE000" />
          <span class="colors__value" style="background-color: #8be000">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" value="#222" />
          <span class="colors__value" style="background-color: #222">
          </span>
        </label>
      </li>
    </ul> -->
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';

import { formatNumber } from '@/helpers/formatters';

import type { ProdCardType } from '@/types/catalogTypes';

type Props = {
  card: ProdCardType;
}

const props = defineProps<Props>();

const curTitle = ref(props.card.offers[0].title);
const curPrice = ref(props.card.offers[0].price);

const formattedPrice = computed(() => formatNumber(curPrice.value));
</script>
