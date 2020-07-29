<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="bannersLoad" />
      </a>
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
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    bannersLoad() {
      if (!this.isLoad) {
        this.$emit('bannersLoad');
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped></style>
