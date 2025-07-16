import { supabase, AppItem } from '../lib/supabase'

// Obtener aplicaciones destacadas
export const getFeaturedApps = async (): Promise<AppItem[]> => {
  try {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured apps:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching featured apps:', error)
    return []
  }
}

// Obtener aplicaciones por categoría
export const getAppsByCategory = async (categoryId: string): Promise<AppItem[]> => {
  try {
    if (categoryId === 'home') {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching all apps:', error)
        return []
      }

      return data || []
    }

    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .eq('category', categoryId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching apps by category:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching apps by category:', error)
    return []
  }
}

// Buscar aplicaciones
export const getAppsBySearch = async (query: string): Promise<AppItem[]> => {
  try {
    const searchTerm = `%${query.toLowerCase()}%`
    
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .or(`name.ilike.${searchTerm},description.ilike.${searchTerm},subcategory.ilike.${searchTerm},publisher.ilike.${searchTerm}`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching apps:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error searching apps:', error)
    return []
  }
}

// Obtener aplicación por ID
export const getAppById = async (id: string): Promise<AppItem | null> => {
  try {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching app by id:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching app by id:', error)
    return null
  }
}

// Obtener todas las aplicaciones
export const getAllApps = async (): Promise<AppItem[]> => {
  try {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all apps:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching all apps:', error)
    return []
  }
}