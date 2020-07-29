<template>
  <div class="navBar">
    <span
      v-for="(item, index) in titles"
      :key="item"
      :class="{ active: index === curIndex }"
      @click="activeClick(index)"
      >{{ item }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    activeClick(index) {
      this.curIndex = index;
      this.$emit('navbarClick', index);
    },
  },
};
</script>

<style scoped>
.navBar {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}
.navBar span {
  padding: 15px 5px 5px 5px;
}
.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>
