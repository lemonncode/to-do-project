import { ref } from "vue";
import { supabase } from "@/lib/supabase";

const user = ref(null);

// Obtener sesión de usuario actual
const getUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error al obtener sesión:", error);
  } else if (data?.session?.user) {
    user.value = data.session.user;
  }
};

const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  user.value = data.user;
  return data;
};

const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  user.value = data.user;
  return data;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  user.value = null;
};

export function useAuth() {
  return {
    user,
    getUser,
    signUp,
    signIn,
    signOut,
  };
}
