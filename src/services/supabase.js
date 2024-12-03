import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zwyjofwojucckieszzpn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3eWpvZndvanVjY2tpZXN6enBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNTg1NTgsImV4cCI6MjA0ODczNDU1OH0.n4GWAjFzIgqMgFicGUr5RMPP2GzrAqP75LfyZ7XZXno";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
