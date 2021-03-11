import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: "Classifications",
    path: "/",
    component: () => import ("./../components/Classifications.vue")
  },
  {
    name: "Locations",
    path: "/locations",
    component: () => import("./../components/Locations.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
