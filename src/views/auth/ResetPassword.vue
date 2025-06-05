<template>
  <div class="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">¿Olvidaste tu contraseña?</h2>
    <form @submit.prevent="resetPassword">
      <input
        v-model="email"
        type="email"
        placeholder="Tu correo"
        class="w-full p-2 border rounded mb-4"
        required
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar correo de recuperación
      </button>
    </form>
    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const email = ref('')
const message = ref('')
const error = ref('')

const resetPassword = async () => {
  const { data, error: err } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'http://localhost:5173/reset-password'
  })

  if (err) {
    error.value = err.message
    message.value = ''
  } else {
    message.value = 'Te hemos enviado un correo para restablecer la contraseña.'
    error.value = ''
  }
}
</script>
