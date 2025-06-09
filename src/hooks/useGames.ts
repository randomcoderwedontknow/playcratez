import { useState, useEffect } from 'react'
import { supabase, Database } from '../lib/supabase'
import { useAuth } from './useAuth'

type Game = Database['public']['Tables']['games']['Row']
type GameInsert = Database['public']['Tables']['games']['Insert']
type GameUpdate = Database['public']['Tables']['games']['Update']

export function useGames() {
  const { user } = useAuth()
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchGames()
    } else {
      setGames([])
      setLoading(false)
    }
  }, [user])

  const fetchGames = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setGames(data || [])
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setLoading(false)
    }
  }

  const createGame = async (gameData: Omit<GameInsert, 'user_id'>) => {
    if (!user) return { data: null, error: 'Not authenticated' }

    try {
      const { data, error } = await supabase
        .from('games')
        .insert({
          ...gameData,
          user_id: user.id
        })
        .select()
        .single()

      if (error) throw error
      setGames(prev => [data, ...prev])
      return { data, error: null }
    } catch (error) {
      console.error('Error creating game:', error)
      return { data: null, error }
    }
  }

  const updateGame = async (gameId: string, updates: GameUpdate) => {
    try {
      const { data, error } = await supabase
        .from('games')
        .update(updates)
        .eq('id', gameId)
        .select()
        .single()

      if (error) throw error
      setGames(prev => prev.map(game => game.id === gameId ? data : game))
      return { data, error: null }
    } catch (error) {
      console.error('Error updating game:', error)
      return { data: null, error }
    }
  }

  const deleteGame = async (gameId: string) => {
    try {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId)

      if (error) throw error
      setGames(prev => prev.filter(game => game.id !== gameId))
      return { error: null }
    } catch (error) {
      console.error('Error deleting game:', error)
      return { error }
    }
  }

  return {
    games,
    loading,
    createGame,
    updateGame,
    deleteGame,
    refetch: fetchGames
  }
}