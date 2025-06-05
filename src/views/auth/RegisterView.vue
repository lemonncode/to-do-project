<template>
  <div class="min-h-screen bg-[url('src/assets/img/retro.jpg')] bg-cover bg-center flex items-center justify-center font-sans">
    <form
      @submit.prevent="handleRegister"
      class="w-full max-w-sm space-y-4 bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg"
    >
      <h1 class="text-xl font-semibold text-gray-800 text-center">Registro</h1>

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
        Crear cuenta
      </button>

      <p class="text-sm text-center text-gray-700">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-blue-500 hover:underline">Inicia sesión</router-link>
      </p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { signUp } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleRegister = async () => {
  const { error } = await signUp(email.value, password.value)
  if (!error) router.push('/dashboard')
  else alert(error.message)
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded;
}
.btn {
  @apply w-full bg-green-600 text-white py-2 rounded hover:bg-green-700;
}
</style>

