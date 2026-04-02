import { createClient } from '@supabase/supabase-js'

// Using the variables Vercel just pulled for you
const supabaseUrl = 'https://lyhgfezubrbgikuxhcug.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aGdmZXp1YnJiZ2lrdXhoY3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NTA5MzUsImV4cCI6MjA5MDIyNjkzNX0.5NVruxDA8pV5zjzjIGY6aTScaLa6EiJu2cmCzcjuaSM'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)