import { createClient } from '@supabase/supabase-js';

// Your Supabase Credentials
const SUPABASE_URL = 'https://bnqsnqumzywxttzojvtk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucXNucXVtenl3eHR0em9qdnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTE5MTMsImV4cCI6MjA3OTIyNzkxM30.2cYb8lm5U20H5pi23xrEBYGsEeEAY-hM-Rz9HX65TK0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
