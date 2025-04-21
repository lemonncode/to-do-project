<script setup>
import { ref, onMounted, watch } from "vue";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/composables/useAuth";

const tasks = ref([]);
const { user } = useAuth();

// Obtener tareas del usuario logueado
const fetchTasks = async () => {
  if (user.value) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.value.id);

    if (error) {
      console.error("Error al cargar tareas:", error);
    } else {
      tasks.value = data || [];
      console.log("Tareas cargadas:", data);
    }
  }
};

onMounted(fetchTasks);

// Verificar la reactividad de tasks usando watch
watch(tasks, (newTasks) => {
  console.log("Tareas actualizadas:", newTasks);
});
</script>

<template>
  <section class="p-4">
    <h1 class="text-2xl font-bold mb-4">Tus tareas</h1>

    <form @submit.prevent="addTask" class="mb-4">
      <input
        v-model="newTaskTitle"
        type="text"
        placeholder="Agregar nueva tarea"
        class="input"
        required
      />
      <button type="submit" class="btn">Agregar tarea</button>
    </form>

    <p v-if="tasks.length === 0" class="text-gray-500">
      No tienes tareas pendientes.
    </p>

    <ul class="space-y-2">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="mb-2 p-2 border rounded shadow-sm bg-white"
      >
        <strong>{{ task.name }}</strong><br />
        <small class="text-gray-500">{{ new Date(task.created_at).toLocaleString() }}</small>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded;
}
.btn {
  @apply w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700;
}
</style>


