import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import CatalogPage from '@/pages/CatalogPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
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
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
