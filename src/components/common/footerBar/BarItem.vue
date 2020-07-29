<template>
  <div class="footerBarItem" :style="isActiveStyle" @click="Clicked">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red',
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    isActiveStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    Clicked() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.footerBarItem {
  margin: 5px 0;
}
.text {
  font-size: 14px;
  padding-top: 2px;
}
</style>
