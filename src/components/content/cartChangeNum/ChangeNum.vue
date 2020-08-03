<template>
  <div class="numWrapper">
    <button @click="decrement" :disabled="num <= 1">-</button>
    <input type="text" :value="num" @blur="changeNum($event)" />
    <button @click="increment">+</button>
    <button class="delete" @click="remove">删除</button>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 1,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    decrement() {
      this.$emit('cart-changeNum', {
        type: 'dec',
      });
    },
    increment() {
      this.$emit('cart-changeNum', {
        type: 'inc',
      });
    },
    changeNum(event) {
      console.log(event);
      this.$emit('cart-changeNum', {
        num: event.target.value,
        type: 'text',
      });
    },
    remove() {
      this.$emit('cart-del');
    },
  },
};
</script>

<style>
.numWrapper {
  display: flex;
  justify-content: center;
}
.delete {
  width: 30%;
  margin-left: 5px;
}
input {
  width: 20%;
  text-align: center;
}
button {
  width: 15%;
}
</style>
