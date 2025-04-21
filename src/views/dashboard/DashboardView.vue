<template>
  <section class="p-4">
    <h1 class="text-2xl font-bold mb-4">Tus tareas</h1>

    <!-- Formulario para agregar tarea -->
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

    <!-- Mostrar mensaje si no hay tareas -->
    <p v-if="tasks && tasks.length === 0" class="text-gray-500">
      No tienes tareas pendientes.
    </p>

    <!-- Lista de tareas -->
    <ul>
      <TodoItem v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TodoForm from "@/components/TodoForm.vue"; // Importa el componente TodoForm
import TodoItem from "@/components/TodoItem.vue";
import { supabase } from "@/lib/supabase";

const tasks = ref([]); // Lista de tareas
const newTaskTitle = ref(""); // Título de la nueva tarea

// Función para obtener las tareas del usuario logueado
const fetchTasks = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error al obtener sesión:", sessionError);
    return;
  }

  const userId = session?.user?.id;

  if (userId) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId); // Filtrar por el user_id
    if (error) {
      console.error("Error al cargar tareas:", error);
    } else {
      tasks.value = data; // Actualizamos las tareas en la lista

      // Console log para ver las tareas que se cargan
      console.log("Tareas cargadas para el usuario con ID:", userId);
      console.log("Tareas:", tasks.value); // Ver qué tareas son cargadas
    }
  }
};

// Función para agregar una nueva tarea
const addTask = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error al obtener sesión:", sessionError);
    return;
  }

  const userId = session?.user?.id;

  if (userId) {
    const { error } = await supabase
      .from("tasks")
      .insert([{ name: newTaskTitle.value, user_id: userId }]); // sin pasar "id"

    if (error) {
      console.error("Error al agregar tarea:", error);
    } else {
      newTaskTitle.value = ""; // Limpiar el campo de entrada
      fetchTasks(); // Recargar las tareas
    }
  }
};

// Cargar las tareas cuando el componente se monta
onMounted(fetchTasks);
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded;
}
.btn {
  @apply w-full bg-green-600 text-white py-2 rounded hover:bg-green-700;
}
</style>
