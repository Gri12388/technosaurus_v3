import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import CatalogPage from '@/pages/CatalogPage.vue';
import ProductPage from '@/pages/ProductPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogPage,
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: ProductPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
