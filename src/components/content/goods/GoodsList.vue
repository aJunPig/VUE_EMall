<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.link" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
export default {
  components: {
    GoodsListItem,
  },
  props: ['goods'],
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}
</style>
