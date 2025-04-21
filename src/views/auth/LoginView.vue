<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="handleLogin" class="w-full max-w-sm space-y-4">
      <h1 class="text-2xl font-bold">Iniciar sesión</h1>
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Contraseña" class="input" />
      <button type="submit" class="btn">Entrar</button>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
      <p class="text-sm">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-blue-500">Regístrate</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { signIn } = useAuth()

const handleLogin = async () => {
  error.value = ''
  try {
    await signIn(email.value, password.value)
    router.push('/dashboard') // redirige al dashboard
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded;
}
.btn {
  @apply w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700;
}
</style>

