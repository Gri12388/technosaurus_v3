import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CatalogPage from '@/pages/CatalogPage.vue';
import ProductPage from '@/pages/ProductPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogPage,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
