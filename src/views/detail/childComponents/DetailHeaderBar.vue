<template>
  <div>
    <header-bar class="headerBar">
      <div slot="left" class="goBack" @click="goBackClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in headerTitles"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </header-bar>
  </div>
</template>

<script>
import HeaderBar from 'components/common/headerBar/HeaderBar';
export default {
  components: {
    HeaderBar,
  },
  data() {
    return {
      headerTitles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('headerClick', index);
    },
    goBackClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-around;
}
.headerBar {
  box-shadow: 0 2px 1px rgba(100, 100, 100, 0.1);
}
.active {
  color: var(--color-high-text);
}
.goBack {
  padding-left: 16px;
}
.goBack img {
  margin-top: 12px;
}
</style>
