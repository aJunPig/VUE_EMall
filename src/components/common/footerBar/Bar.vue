<template>
  <div class="footerBar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footerBar {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f6f6f6;
  height: 60px;
  text-align: center;
  color: black;
  padding: 3px 0;
}
</style>
