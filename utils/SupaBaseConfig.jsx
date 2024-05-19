
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://yqydmwgzqyyxawfaedyy.supabase.co',
                                     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxeWRtd2d6cXl5eGF3ZmFlZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNDgzNDUsImV4cCI6MjAzMTcyNDM0NX0.Lqg6pf67cPgLAYEQz8OtQZN4cONKqhpO2o6KTBu7OFw')