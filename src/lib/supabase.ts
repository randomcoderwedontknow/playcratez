import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          username: string | null
          onboarding_completed: boolean
          trial_started_at: string
          trial_expires_at: string
          subscription_status: 'trial' | 'active' | 'expired' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username?: string | null
          onboarding_completed?: boolean
          trial_started_at?: string
          trial_expires_at?: string
          subscription_status?: 'trial' | 'active' | 'expired' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string | null
          onboarding_completed?: boolean
          trial_started_at?: string
          trial_expires_at?: string
          subscription_status?: 'trial' | 'active' | 'expired' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      games: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          game_type: 'mini' | 'full'
          creation_style: 'blocks' | 'ai' | 'code'
          target_platform: 'web' | 'mobile' | 'desktop' | 'vr'
          game_data: any
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          game_type: 'mini' | 'full'
          creation_style: 'blocks' | 'ai' | 'code'
          target_platform: 'web' | 'mobile' | 'desktop' | 'vr'
          game_data?: any
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          game_type?: 'mini' | 'full'
          creation_style?: 'blocks' | 'ai' | 'code'
          target_platform?: 'web' | 'mobile' | 'desktop' | 'vr'
          game_data?: any
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}