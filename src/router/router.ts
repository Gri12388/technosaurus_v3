import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import CatalogPage from '@/pages/CatalogPage.vue';
import CartPage from '@/pages/CartPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
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
  {
    path: '/order/:orderId',
    name: 'orderInfo',
    component: OrderInfoPage,
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '/:catchAll(.*)',
  },
];

const router = createRouter({
  history: createWebHashHistory('/technosaurus_v3'),
  routes,
});

export default router;
