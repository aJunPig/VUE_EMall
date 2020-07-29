<template>
  <scroll>
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="item.iid"
      :item-info="item"
      :index="index"
    ></cart-list-item>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
import CartListItem from './CartListItem';

export default {
  components: {
    Scroll,
    CartListItem,
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
