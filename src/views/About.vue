<template>
  <div class="about">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import Vue from 'vue';
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
  name: "About"
}
</script>