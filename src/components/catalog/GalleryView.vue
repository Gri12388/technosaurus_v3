<template>
  <section class="catalog">
    <ul class="catalog__list">
      <ProdCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :price="card.price"
        :image="card.image"
      />
    </ul>

    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a
          class="
            pagination__link pagination__link--arrow pagination__link--disabled
          "
          aria-label="Предыдущая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--current"> 1 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 2 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 3 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 4 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> ... </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 10 </a>
      </li>
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          href="#"
          aria-label="Следующая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ProdCard from '@/components/catalog/ProdCard.vue';

import type { ProdCardType } from '@/types/catalogTypes';

type Props = {
  cards: ProdCardType[];
}

defineProps<Props>();

</script>
