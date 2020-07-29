<template>
  <div id="cart">
    <header-bar class="header-bar">
      <div slot="center">购物车({{ cartCount }})</div>
    </header-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar />
  </div>
</template>

<script>
import HeaderBar from 'components/common/headerBar/HeaderBar';
import CartList from './childComponents/CartList';
import BottomBar from './childComponents/BottomBar';
import { mapGetters } from 'vuex';

export default {
  components: {
    HeaderBar,
    CartList,
    BottomBar,
  },
  computed: {
    ...mapGetters(['cartList', 'cartCount']),
  },
};
</script>

<style scoped>
#cart {
  position: relative;
  height: 100vh;
}

.header-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 100px;
  width: 100%;
}
</style>
