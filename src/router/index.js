import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/examples",
    name: "Examples",
    component: () =>
      import(/* webpackChunkName: "parent" */ "../examples/Parent.vue")
  },
  {
    path: "/friend",
    name: "Friend",
    component: () =>
      import(/* webpackChunkName: "friend" */ "../examples/Friend.vue")
  },
  {
    path: "/error",
    name: "Error",
    component: () => import(/* webpackChunkName: "error" */ "../pages/Error")
  }
];

export default new VueRouter({ routes });
