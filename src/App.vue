<script setup>
import { onMounted } from 'vue'
import { supabase } from './lib/supabase'

onMounted(async () => {
 const { data, error } = await supabase.from('tasks').select('id, name, status, user_id')

  if (error) {
    console.error('Error al conectar con Supabase:', error.message)
  } else {
    console.log('Datos:', data)
  }
})
</script>

<template>

   <router-view />
</template>
