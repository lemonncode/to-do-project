<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'  // Para redirigir
import TodoItem from '@/components/TodoItem.vue'
import { supabase } from '@/lib/supabase'

const tasks = ref([])  // Lista de tareas
const newTaskTitle = ref('')  // Título de la nueva tarea
const router = useRouter()  // Para manejar la redirección

// Función para obtener la sesión y las tareas
const fetchTasks = async () => {
  const { data: session, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('Error al obtener sesión:', sessionError)
    return
  }

  if (!session || !session.user) {
    console.log('El usuario no está autenticado o la sesión es inválida')
    // router.push('/login')  // Redirigir al login si no hay sesión
    return
  }

  const userId = session.user.id
  console.log('Usuario logueado:', userId)

  if (userId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId) // Filtrar por el user_id
    if (error) {
      console.error('Error al cargar tareas:', error)
    } else {
      tasks.value = data  // Actualizamos las tareas
    }
  }
}

// Función para agregar una nueva tarea
const addTask = async () => {
  const { data: session, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('Error al obtener sesión:', sessionError)
    return
  }

  if (!session || !session.user) {
    console.log('El usuario no está autenticado o la sesión es inválida')
    router.push('/login')  // Redirigir al login si no hay sesión
    return
  }

  const userId = session.user.id

  if (userId) {
    const { error } = await supabase
      .from('tasks')
      .insert([{ title: newTaskTitle.value, user_id: userId }])

    if (error) {
      console.error('Error al agregar tarea:', error)
    } else {
      console.log('Tarea agregada correctamente') // Verificar si la tarea se agrega
      newTaskTitle.value = '' // Limpiar el campo de entrada
      fetchTasks() // Recargar las tareas
    }
  }
}

// Cargar las tareas cuando el componente se monta
onMounted(fetchTasks)
</script>

<template>
  <section class="p-4">
    <form @submit.prevent="addTask" class="mb-4">
      <input
        v-model="newTaskTitle"
        type="text"
        placeholder="Nueva tarea"
        class="input"
        required
      />
      <button type="submit" class="btn">Agregar tarea</button>
    </form>

    <ul>
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </ul>
  </section>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded;
}
.btn {
  @apply w-full bg-green-600 text-white py-2 rounded hover:bg-green-700;
}
</style>

