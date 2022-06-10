import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", redirect: "/landing" },
  {
    path: "/landing",
    name: "landing",
    component: () => import("./pages/LandingPage.vue")
  },
  {
    path: "/add-player",
    name: "add player",
    component: () => import("./pages/AddPlayer.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;