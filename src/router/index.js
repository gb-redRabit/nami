import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  { path: "/", name: "home", component: () => import("../views/HomeView") },
  {
    path: "/list",
    name: "anime",
    component: () => import("../views/ListView.vue"),
  },

  {
    path: "/move",
    name: "filmy",
    component: () => {},
  },
  {
    path: "/photo",
    name: "galeria",
    component: () => {},
  },
  {
    path: "/other",
    name: "inne",
    component: () => {},
  },
  {
    path: "/setting",
    name: "ustawienia",
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
