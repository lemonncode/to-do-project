<template>
  <li class="mb-2">
    <div class="flex justify-between items-center">
      <span>{{ task.name }}</span>
      <div>
        <button @click="toggleComplete" class="bg-green-500 text-white px-2 py-1 rounded">
          Marcar como completada
        </button>
        <button @click="deleteTask" class="bg-red-500 text-white px-2 py-1 rounded">
          Eliminar
        </button>
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  task: Object
})

const toggleComplete = async () => {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: !props.task.completed })
    .eq('id', props.task.id)

  if (error) {
    console.error('Error al actualizar tarea:', error)
  } else {
    // Aquí puedes actualizar el estado de la tarea en el frontend si es necesario
    props.task.completed = !props.task.completed
  }
}

const deleteTask = async () => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', props.task.id)

  if (error) {
    console.error('Error al eliminar tarea:', error)
  }
}
</script>
