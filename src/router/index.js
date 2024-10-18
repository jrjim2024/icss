import { createRouter, createWebHistory } from "vue-router";
import { getAccessToken } from "@/utils/token.js";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = getAccessToken();
  if (
    to.path === "/home" // && !token
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
