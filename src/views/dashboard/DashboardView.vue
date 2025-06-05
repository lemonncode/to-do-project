<template>
  <div class="min-h-screen bg-[url('src/assets/img/retro-2.jpg')] bg-cover bg-center flex items-center justify-center font-retro p-6">
   
    <div class="w-full max-w-sm bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6">

      <div class="flex justify-between items-center bg-black bg-opacity-50 border-b-2 border-gray-600 px-4 py-2 rounded-t-lg">
        <span class="text-sm text-white">Mis Tareas.exe</span>
        <button @click="logout" class="bg-transparent text-white px-2 text-xs border border-white rounded hover:bg-gray-700">
          X
        </button>
      </div>

      <!-- Contenido de las tareas -->
      <div class="p-5 space-y-4">

        <!-- Formulario para agregar tarea -->
        <form @submit.prevent="addTask" class="mb-4 space-y-2">
          <input
            v-model="newTaskTitle"
            type="text"
            placeholder="Nueva tarea"
            class="w-full px-4 py-2 border-1 border-gray-600 rounded-md bg-neutral-600 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
          <button
            type="submit"
            class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition text-sm"
          >
            Agregar tarea
          </button>
        </form>

        <!-- Mostrar mensaje si no hay tareas -->
        <p v-if="tasks && tasks.length === 0" class="text-sm text-gray-400 text-center">
          No tienes tareas pendientes.
        </p>

        <!-- Lista de tareas -->
        <ul class="space-y-2">
          <TodoItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @deleted="handleDelete"
            @updated="fetchTasks"
            class="bg-white/30 border-2 border-gray-600 rounded-lg p-3 text-white"
          />
        </ul>
        <!-- Referencia de colores y tachado -->
        <div class="text-sm text-gray-600 mt-4">
          <p><span class="text-gray-800">Negro:</span> Tareas pendientes</p>
          <p><span class="text-blue-600">Azul:</span> Tareas en progreso</p>
          <p><span class="line-through text-gray-700">Tachado:</span> Tareas completadas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import TodoItem from "@/components/TodoItem.vue";
import { supabase } from "@/lib/supabase";

const tasks = ref([]);
const newTaskTitle = ref("");
const router = useRouter();

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
      .eq("user_id", userId);

    if (error) {
      console.error("Error al cargar tareas:", error);
    } else {
      tasks.value = data;
    }
  }
};

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      router.push('/logout');
    }
  } catch (error) {
    console.error('Error al intentar cerrar sesión:', error);
  }
};

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
      .insert([{ name: newTaskTitle.value, user_id: userId }]);

    if (error) {
      console.error("Error al agregar tarea:", error);
    } else {
      newTaskTitle.value = "";
      fetchTasks();
    }
  }
};

const handleDelete = (deletedTaskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== deletedTaskId);
};

onMounted(fetchTasks);
</script>

