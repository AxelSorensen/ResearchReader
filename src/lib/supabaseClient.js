import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aokjapukmfknqyuqmrdg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFva2phcHVrbWZrbnF5dXFtcmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NDM0ODYsImV4cCI6MTk5NzQxOTQ4Nn0.HG_rcLK2qQcealhHdkGXDTRIz0iyQPW0Nf_YOS9QGqw'
export const supabase = createClient(supabaseUrl, supabaseKey)