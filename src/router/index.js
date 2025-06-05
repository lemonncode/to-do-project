import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import LogoutView from "@/views/auth/LogoutView.vue";
import ForgotPassword  from "@/views/auth/ForgotPassword.vue";
import ResetPassword  from "@/views/auth/ResetPassword.vue";

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
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
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
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuth = !!session;
  const requiresAuth = to.meta.requiresAuth;

  // Si la ruta requiere autenticación pero no hay sesión, redirigir al login
  if (requiresAuth && !isAuth) {
    next("/login");
  } else if ((to.path === "/login" || to.path === "/register") && isAuth) {
    // Si el usuario ya está autenticado y trata de acceder a login/register, redirigir a dashboard
    next("/dashboard");
  } else {
    // Si no hay problema, continuar con la navegación
    next();
  }
});


export default router;
