<template>
  <div id="detail">
    <detail-header-bar class="headerBar" @headerClick="headerClick" ref="headerBar" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :banners="banners" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-footer-bar class="footerBar" @addToCart="addToCart" />
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';

import DetailHeaderBar from './childComponents/DetailHeaderBar';
import DetailSwiper from './childComponents/DetailSwiper';
import DetailBaseInfo from './childComponents/DetailBaseInfo';
import DetailShopInfo from './childComponents/DetailShopInfo';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo';
import DetailParamInfo from './childComponents/DetailParamInfo';
import DetailCommentInfo from './childComponents/DetailCommentInfo';
import DetailFooterBar from './childComponents/DetailFooterBar';

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail';
import { itemListenerMixin, backTopMixin } from 'common/mixins';
import { debounce } from 'common/utils';

export default {
  name: 'Detail',
  components: {
    Scroll,
    GoodsList,
    DetailHeaderBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailFooterBar,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      banners: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: {},
      headerOffsetTop: [],
      getHeaderOffsetTop: null,
      currentIndex: 0,
    };
  },
  methods: {
    imageLoad() {
      this.newRefresh();
      this.getHeaderOffsetTop();
    },
    headerClick(index) {
      this.$refs.scroll.scrollTo(0, -this.headerOffsetTop[index], 100);
    },
    contentScroll(position) {
      const positionY = -position.y;

      let length = this.headerOffsetTop.length;
      //   法1：由于最后一个i的i+1越界，因此分为两种情况判断
      //   for (let i = 0; i < length; i++) {
      //     if (
      //         this.currentIndex !== i &&
      //       (i < length - 1 &&
      //         positionY >= this.headerOffsetTop[i] &&
      //         positionY < this.headerOffsetTop[i + 1]) ||
      //       (i === length - 1 && positionY >= this.headerOffsetTop[i])
      //     ) {
      //       this.currentIndex = i;
      //       this.$refs.headerBar.currentIndex = this.currentIndex;
      //     }
      //   }
      // 法2：给this.headerOffsetTop最后加一个无限大的值，就可以归为一种情况
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.headerOffsetTop[i] &&
          positionY < this.headerOffsetTop[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.headerBar.currentIndex = this.currentIndex;
        }
      }
      this.listenIsShowBackTop(position);
    },
    addToCart() {
      // 获取购物车所需信息
      const product = {};
      product.image = this.banners[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.checked = true;

      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res, 2000);
      });
    },
  },
  created() {
    this.iid = this.$route.query.id;

    //根据iid请求商品详情
    getDetail(this.iid).then(res => {
      // 商品轮播图
      this.banners = res.result.itemInfo.topImages;
      // 商品信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);
      //   店铺信息
      this.shop = new Shop(res.result.shopInfo);
      //   商品详情数据
      this.detailInfo = res.result.detailInfo;
      //   商品参数数据
      this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule);
      //   商品评论
      if (res.result.rate.list) {
        this.commentInfo = res.result.rate.list[0];
      }
    });

    // this.$nextTick(() => {
    //   this.headerOffsetTop = [];
    //   this.headerOffsetTop.push(0);
    //   this.headerOffsetTop.push(this.$refs.param.$el.offsetTop);
    //   this.headerOffsetTop.push(this.$refs.comment.$el.offsetTop);
    //   this.headerOffsetTop.push(this.$refs.recommend.$el.offsetTop);
    // });

    getRecommend().then(res => {
      this.recommend = res.data.list;
    });

    this.getHeaderOffsetTop = debounce(() => {
      this.headerOffsetTop = [];
      this.headerOffsetTop.push(0);
      this.headerOffsetTop.push(this.$refs.param.$el.offsetTop - 44);
      this.headerOffsetTop.push(this.$refs.comment.$el.offsetTop - 44);
      this.headerOffsetTop.push(this.$refs.recommend.$el.offsetTop - 44);
      this.headerOffsetTop.push(Number.MAX_VALUE);
    });
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.goodsImageListener);
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.headerBar {
  background-color: #fff;
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100% - 102px);
}
</style>
