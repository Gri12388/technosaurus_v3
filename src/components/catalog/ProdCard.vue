<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="image" alt="x" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> hello </a>
    </h3>

    <span class="catalog__price">  ₽ </span>

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
import { defineProps } from 'vue';

// import { formatNumber } from '@/helpers/formatters';

type Props = {
  image: string;
}

defineProps<Props>();
</script>
