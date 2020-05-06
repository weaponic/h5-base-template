<template>
  <div style="border: 1px solid; margin: 10px;">
    <h1>子组件</h1>
    <button @click="emitParent">父子组件通信</button>
    <p>父组件说：{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: {
    msg: {
      type: String,
      default: "嗡嗡嗡",
      validator(val) {
        return val === "我是爸爸";
      }
    }
  },
  methods: {
    emitParent(e) {
      this.$emit("c2p", e, "hello", "world");
    }
  }
};
</script>
