<template>
  <div class="home">
    <div class="page loading" v-if="isLoading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <keep-alive include="PageFirst">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" @change="onNavItemChanged">
      <van-tabbar-item name="First" icon="home-o">标签1</van-tabbar-item>
      <van-tabbar-item name="Second" icon="search">标签2</van-tabbar-item>
      <van-tabbar-item name="Third" icon="friends-o">标签3</van-tabbar-item>
      <van-tabbar-item name="Last" icon="setting-o">标签4</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Overlay, Loading } from "vant";
Vue.use(Tabbar).use(TabbarItem).use(Overlay).use(Loading);

export default {
  name: "Home",
  data() {
    return {
      active: "First",
      isLoading: true
    };
  },
  created() {
    this.login();
  },
  methods: {
    onNavItemChanged(name) {
      name !== 'PageFirst' && this.$router.push({ name: `Page${name}` });
    },
    login() {
      setTimeout(() => {
        this.isLoading = false;
        this.$route.name !== 'PageFirst' && this.$router.push({ name: "PageFirst" });
      }, 3000);
    }
  }
};
</script>

<style scoped lang="less">
.page {
  .page-wrapper();
  .flex-center();
}
</style>
