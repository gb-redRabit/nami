// eslint-disable-next-line no-unused-vars
import {
  HomeIcon,
  FilmIcon,
  PhotoIcon,
  FireIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";

export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView"),
    alies: HomeIcon,
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/ListView.vue"),
    alies: FireIcon,
  },

  {
    path: "/move",
    name: "move",
    component: () => {},
    alies: FilmIcon,
  },
  {
    path: "/photo",
    name: "photo",
    component: () => {},
    alies: PhotoIcon,
  },
  {
    path: "/other",
    name: "other",
    component: () => {},
    alies: XCircleIcon,
  },
];
