<template>
  <div class="toast" v-show="isToastShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isToastShow: false,
    };
  },
  methods: {
    show(message, duration = 1500) {
      this.isToastShow = true;
      this.message = message;

      setTimeout(() => {
        this.isToastShow = false;
        this.message = '';
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
</style>
