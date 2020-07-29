<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpload: this.pullUpload,
    });
    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position);
      });
    }

    // 监听上拉事件
    if (this.pullUpload) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      });
    }
  },
};
</script>

<style scoped></style>
