<template>
  <div class="min-h-screen bg-[url('src/assets/img/retro.jpg')] bg-cover bg-center flex items-center justify-center font-sans">
    <div class="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg text-center max-w-md">
      <h1 class="text-xl font-semibold text-gray-800 mb-2">Sesión cerrada</h1>
      <p class="text-sm text-gray-600">Has cerrado tu sesión correctamente.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/login')
  }, 3000) // redirige después de 3 segundos
})
</script>
