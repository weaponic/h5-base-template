<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)" />Friend
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
import { eventBus } from "../scripts/utils/eventBus";
Vue.use(NavBar);
export default {
  name: "Friend",
  data() {
    return {
      msg: "我是小老弟"
    };
  },
  mounted() {
    eventBus.call("toFriendOfChild", this.msg, 1, 2);
  }
};
</script>
