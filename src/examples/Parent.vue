<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <h1>父组件</h1>
    <p>{{ b }}</p>
    <p>{{ c }}</p>
    <Child @c2p="print" :msg="msg"></Child>
    <router-link to="/friend">去找小老弟</router-link>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';

import { eventBus } from "../scripts/utils/eventBus";
import Child from "./Child";
Vue.use(NavBar);

export default {
  name: "Parent",
  components: { Child },
  data() {
    return {
      msg: "我是爸爸",
      b: "",
      c: ""
    };
  },
  mounted() {
    eventBus.register("toFriendOfChild", (a, b, c) => {
      console.log(this.msg, { a, b, c });
    });
  },
  methods: {
    print(a, b, c) {
      console.log(a);
      this.b = b;
      this.c = c;
    }
  }
};
</script>
