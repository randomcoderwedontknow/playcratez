import { useState, useEffect } from 'react'
import { supabase, Database } from '../lib/supabase'
import { useAuth } from './useAuth'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export function useUserProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return { data, error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }
  }

  const completeOnboarding = async () => {
    return await updateProfile({ onboarding_completed: true })
  }

  const isTrialActive = () => {
    if (!profile) return false
    const now = new Date()
    const trialEnd = new Date(profile.trial_expires_at)
    return now < trialEnd && profile.subscription_status === 'trial'
  }

  const getTrialDaysRemaining = () => {
    if (!profile) return 0
    const now = new Date()
    const trialEnd = new Date(profile.trial_expires_at)
    const diffTime = trialEnd.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return {
    profile,
    loading,
    updateProfile,
    completeOnboarding,
    isTrialActive,
    getTrialDaysRemaining,
    refetch: fetchProfile
  }
}