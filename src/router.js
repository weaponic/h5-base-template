import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/p1",
          name: "PageFirst",
          component: () =>
            import(/* webpackChunkName: "page1" */ "./views/PageFirst.vue")
        },
        {
          path: "/p2",
          name: "PageSecond",
          component: () =>
            import(/* webpackChunkName: "page2" */ "./views/PageSecond.vue")
        },
        {
          path: "/p3",
          name: "PageThird",
          component: () =>
            import(/* webpackChunkName: "page3" */ "./views/PageThird.vue")
        },
        {
          path: "/p4",
          name: "PageLast",
          component: () =>
            import(/* webpackChunkName: "page4" */ "./views/PageLast.vue")
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: function () {
            return import(/* webpackChunkName: "about" */ "./views/About.vue");
          }
        }
      ]
    },
    {
      path: "/example",
      name: "Example",
      component: () => import("./examples/Parent")
    },
    {
      path: "/friend",
      name: "Friend",
      component: () => import("./examples/Friend")
    }
  ]
});
