import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import LogoutView from "@/views/auth/LogoutView.vue";

import { supabase } from "@/lib/supabase";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogoutView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🛡️ Protección de rutas que requieren auth
router.beforeEach((to, from, next) => {
  const user = supabase.auth.getUser();
  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});




export default router; 