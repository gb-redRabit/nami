import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  { path: "/", name: "home", component: () => import("../views/HomeView") },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/ListView.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/ListView.vue"),
  },
  {
    path: "/move",
    name: "move",
    component: () => {},
  },
  {
    path: "/photo",
    name: "photo",
    component: () => {},
  },
  {
    path: "/other",
    name: "other",
    component: () => {},
  },
  {
    path: "/setting",
    name: "setting",
    component: () => {},
  },
];

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
