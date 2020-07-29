<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in banners" :key="item">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper';
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 270px;
}
.detail-swiper img {
  width: 100%;
}
</style>
