import Vue from 'vue';
import VueRouter from 'vue-router';

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const Home = () => import('views/home/Home.vue');
const Category = () => import('views/category/Category.vue');
const ShoppingCart = () => import('views/shoppingCart/ShoppingCart.vue');
const Profile = () => import('views/profile/Profile.vue');
const Detail = () => import('views/detail/Detail.vue');

const routes = [
  {
    path: '',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/cart',
    component: ShoppingCart,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/detail',
    component: Detail,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
