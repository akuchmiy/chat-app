import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store'
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      const hasAccess = store.getters['auth/hasAccess']
      if (!hasAccess) next('/auth')
      else next()
    },
    children: [
      {
        path: 'rooms/:roomId',
        name: "Room",
        component: () => import("@/components/Room/RoomContainer")
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
    component: () => import("@/views/Auth"),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { layout: 'authorization' },
    component: () => import("@/views/NotFound")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
