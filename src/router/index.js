import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
