import { debounce } from './utils';
export const itemListenerMixin = {
  data() {
    return {
      goodsImageListener: null,
      newRefresh: null,
    };
  },
  mounted() {
    //  监听item图片加载完成
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    this.goodsImageListener = () => this.newRefresh();
    this.$bus.$on('imgLoad', this.goodsImageListener);
    // console.log('mixins');
  },
};

import BackTop from 'components/content/backTop/BackTop';
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenIsShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    },
  },
};
