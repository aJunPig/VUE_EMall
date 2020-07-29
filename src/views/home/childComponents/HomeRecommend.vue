<template>
  <div class="recommend">
    <div class="item" v-for="item in recommends" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  padding: 10px 3px 30px;
  font-size: 12px;
  border-bottom: 10px solid #eeeeee;
}
.item {
  flex: 1;
}
.item a img {
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
}
</style>
