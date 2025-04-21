<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="handleRegister" class="w-full max-w-sm space-y-4">
      <h1 class="text-2xl font-bold">Registro</h1>
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Contraseña" class="input" />
      <button type="submit" class="btn">Crear cuenta</button>
      <p class="text-sm">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-blue-500">Inicia sesión</router-link>
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

