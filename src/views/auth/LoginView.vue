<template>
  <div class="min-h-screen bg-[url('src/assets/img/retro.jpg')] bg-cover bg-center flex items-center justify-center font-sans">
    <!-- Ventana minimalista -->
    <div class="w-full max-w-sm bg-white/70 backdrop-blur-md rounded-lg shadow-lg">

    

      <!-- Contenido del formulario -->
      <form @submit.prevent="handleLogin" class="p-6 space-y-5">
        <h1 class="text-lg font-semibold text-center text-gray-800">Iniciar sesión</h1>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition text-sm"
        >
          Entrar
        </button>

        <p class="text-center text-sm">
          <router-link to="/forgot-password" class="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </router-link>
        </p>

        <p v-if="error" class="text-center text-red-500 text-sm">{{ error }}</p>

        <p class="text-center text-sm text-gray-700">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-blue-500 hover:underline">
            Regístrate
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const { signIn } = useAuth();

const handleLogin = async () => {
  error.value = "";
  try {
    await signIn(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    error.value = err.message;
  }
};
</script>


