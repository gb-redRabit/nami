// eslint-disable-next-line no-unused-vars
import {
  HomeIcon,
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
    path: "/list/:id",
    name: "listItem",
    component: () => import("../views/DescriptionItem.vue"),
    props: true,
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
