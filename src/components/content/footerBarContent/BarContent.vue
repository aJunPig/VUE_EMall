<template>
  <bar>
    <bar-item path="/home" activeColor="deeppink">
      <i slot="icon" class="iconfont icon-shouye"></i>
      <div slot="text" class="text">首页</div>
    </bar-item>
    <bar-item path="/category" activeColor="deeppink">
      <i slot="icon" class="iconfont icon-fenlei"></i>
      <div slot="text" class="text">分类</div>
    </bar-item>
    <bar-item path="/cart" activeColor="deeppink">
      <i slot="icon" class="iconfont icon-gouwuche"></i>
      <div slot="text" class="text">购物车</div>
    </bar-item>
    <bar-item path="/profile" activeColor="deeppink">
      <i slot="icon" class="iconfont icon-wode"></i>
      <div slot="text" class="text">我的</div>
    </bar-item>
  </bar>
</template>

<script>
import Bar from 'components/common/footerBar/Bar';
import BarItem from 'components/common/footerBar/BarItem';
export default {
  components: {
    Bar,
    BarItem,
  },
};
</script>

<style scoped></style>
