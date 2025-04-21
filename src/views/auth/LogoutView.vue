<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth()
const router = useRouter()

logout().then(() => {
  router.push('/login')
})
</script>

<template>
  <p>Cerrando sesión...</p>
</template>
