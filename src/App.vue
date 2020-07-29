<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <bar-content />
  </div>
</template>

<script>
import BarContent from 'components/content/footerBarContent/BarContent';
export default {
  components: {
    BarContent,
  },
};
</script>

<style scoped>
@import '~assets/css/base.css';
</style>
