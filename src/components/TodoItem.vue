<template>
  <li class="flex justify-between items-center bg-white/80 backdrop-blur-md border border-gray-300 rounded-md p-3 shadow-sm">
    <!-- Texto de la tarea -->
    <span
      :class="{
        'line-through text-gray-400': task.status === 'completado',
        'text-blue-600': task.status === 'en progreso',
        'text-gray-800': task.status === 'pendiente'
      }"
      class="text-sm"
    >
      {{ task.name }}
    </span>

    <!-- Botones -->
    <div class="flex space-x-2">
      <button
        @click="toggleStatus"
        class="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
      >
        Cambiar
      </button>
      <button
        @click="deleteTask"
        class="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
      >
        Eliminar
      </button>
    </div>
  </li>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  task: Object
})

const emit = defineEmits(['deleted', 'updated'])

const toggleStatus = async () => {
  const nextStatus = getNextStatus(props.task.status);
  console.log('Cambiando estado de tarea:', props.task.id, 'de', props.task.status, 'a', nextStatus);

  const { data, error } = await supabase
    .from('tasks')
    .update({ status: nextStatus })
    .eq('id', props.task.id);

  if (error) {
    console.error('Error al actualizar tarea:', error);
  } else {
    console.log('Tarea actualizada correctamente:', data);
    emit('updated'); // Emitimos evento para que el padre recargue las tareas
  }
}

const deleteTask = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', props.task.id)
    .select()

  if (error) {
    console.error('Error al eliminar tarea:', error.message)
  } else {
    emit('deleted', props.task.id) // Avisamos al padre cuál se borró
  }
}

// Función para cambiar entre los estados posibles
const getNextStatus = (currentStatus) => {
  if (currentStatus === 'pendiente') return 'en progreso'
  if (currentStatus === 'en progreso') return 'completado'
  return 'pendiente' // Regresa a 'pendiente' después de 'completado'
}
</script>


