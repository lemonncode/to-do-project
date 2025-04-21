import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iklmftiwcbkaaavuflpl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbG1mdGl3Y2JrYWFhdnVmbHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4ODUzNjIsImV4cCI6MjA2MDQ2MTM2Mn0.a93KqFYoxke5vf7OjpzNB4fM8LzQZ_-nrCMR38QtCA4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  persistSession: true, // Asegura que la sesión persista entre recargas de la página
  autoRefreshToken: true, // Automáticamente refresca el token cuando sea necesario
});
