import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jmvtrwdbbmukejsqfwbm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdnRyd2RiYm11a2Vqc3Fmd2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTc4ODEsImV4cCI6MjA3NjM3Mzg4MX0.esBLusF81LULv7whO9xhaD5iDYWhQkuW8dwc_jGDXL0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)