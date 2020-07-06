import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';
import Home from '../views/Home.vue';

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/camera',
    name: 'camera',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cameras" */ '../views/Camera.vue'),
  },
  {
    path: '/pictures',
    name: 'pictures',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "pictures" */ '../views/Pictures.vue'),
  },
];

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
