// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// 🔐 Direct values for your specific project
const supabaseUrl = 'https://avhwpfkamasheubbxxpu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2aHdwZmthbWFzaGV1YmJ4eHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NTQ3NzEsImV4cCI6MjA2OTQzMDc3MX0.ZKdOG-IVHG5vhVOHW1d-IcxdoZ1YJqDQkn7v9pvkIww'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
