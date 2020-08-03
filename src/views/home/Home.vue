<template>
  <div id="home">
    <header-bar id="headerBar"><div slot="center">购物街</div></header-bar>
    <nav-bar
      ref="navbarFixed"
      class="navBar"
      @navbarClick="navbarClick"
      :titles="['流行', '新款', '精选']"
      v-show="isNavBarFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-upload="true"
      @scroll="throttleScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        v-if="banners.length > 0"
        class="home-swiper"
        :banners="banners"
        @bannersLoad="bannersLoad"
      />
      <home-recommend :recommends="recommends" />
      <feature-view />
      <nav-bar ref="navbarScroll" @navbarClick="navbarClick" :titles="['流行', '新款', '精选']" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 公共组件
import HeaderBar from 'components/common/headerBar/HeaderBar';
import Scroll from 'components/common/scroll/Scroll';
import NavBar from 'components/content/navbar/NavBar';
import GoodsList from 'components/content/goods/GoodsList';

// 视图内组件
import HomeSwiper from './childComponents/HomeSwiper';
import HomeRecommend from './childComponents/HomeRecommend';
import FeatureView from './childComponents/FeatureView';

// import { debounce } from 'common/utils';
import { itemListenerMixin, backTopMixin } from 'common/mixins';
import { throttle } from 'common/utils';

// 请求数据
import { getHomeMultiData, getHomeGoods } from 'network/home';

export default {
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    HeaderBar,
    Scroll,
    NavBar,
    GoodsList,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
  },
  data() {
    return {
      currentNav: 'pop',
      navbarOffsetTop: 0,
      isNavBarFixed: false,
      saveY: 0,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      throttleScroll: () => {},
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentNav].list;
    },
  },
  methods: {
    // 事件监听
    navbarClick(index) {
      switch (index) {
        case 0:
          this.currentNav = 'pop';
          break;
        case 1:
          this.currentNav = 'new';
          break;
        case 2:
          this.currentNav = 'sell';
          break;
      }
      this.$refs.navbarFixed.curIndex = index;
      this.$refs.navbarScroll.curIndex = index;
    },
    contentScroll(position) {
      //   console.log('throttle');
      // 判断backTop按钮是否显示
      this.listenIsShowBackTop(position);
      //   判断navbar是否吸顶，fixed
      this.isNavBarFixed = -position.y > this.navbarOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentNav);
    },
    bannersLoad() {
      this.navbarOffsetTop = this.$refs.navbarScroll.$el.offsetTop;
    },
    //  网络数据请求
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },

  created() {
    // 请求首页banners、recommends数据
    this.getHomeMultiData();
    // 请求首页流行、新款、精选商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    this.throttleScroll = throttle(this.contentScroll, 1000, true);
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听
    this.$bus.$off('imgLoad', this.goodsImageListener);
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
#headerBar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.navBar {
  position: relative;
  z-index: 9;
}
.content {
  /* height: calc(100% - 104px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
}
</style>
