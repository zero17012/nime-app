import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

export type User = {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
  }
  created_at?: string
}

export type AppItem = {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  image_url: string
  logo_url?: string
  screenshots: string[]
  youtube_id?: string
  rating: number
  reviews: number
  price: string
  publisher: string
  download_url: string
  type: string
  featured: boolean
  system_requirements?: {
    minimum: {
      os: string
      processor: string
      memory: string
      graphics: string
      storage: string
    }
    recommended: {
      os: string
      processor: string
      memory: string
      graphics: string
      storage: string
    }
  }
  created_at?: string
  updated_at?: string
}