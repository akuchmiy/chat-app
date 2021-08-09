import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: 'rooms/:roomId',
        name: "Room",
        component: () => import("../components/RoomContainer")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {layout: 'authorization'},
    component: () => import("../views/Auth.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
