<template>
  <div class="min-h-screen bg-[url('src/assets/img/retro.jpg')] bg-cover bg-center flex items-center justify-center font-sans">
    <div class="w-full max-w-sm bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-6">

      <h2 class="text-lg font-semibold text-gray-800 mb-4 text-center">¿Olvidaste tu contraseña?</h2>

      <form v-if="!message" @submit.prevent="resetPassword" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Tu correo"
          class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition text-sm"
        >
          Enviar correo de recuperación
        </button>
      </form>

      <p v-if="message" class="mt-4 text-green-600 text-sm text-center">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600 text-sm text-center">{{ error }}</p>

    </div>
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
    email.value = ''
  }
}
</script>
