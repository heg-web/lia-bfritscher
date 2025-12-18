import { createRouter, createWebHashHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import HomeView from "../views/HomeView.vue";
import DetailView from "@/views/DetailView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/apropos", component: AboutView },
  { path: "/details/:id", component: DetailView },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
