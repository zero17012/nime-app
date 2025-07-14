import React, { useState, useEffect } from 'react'
import { X, User, Mail, Camera, Save, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, signOut } = useAuth()
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '')
      setAvatarUrl(user.user_metadata?.avatar_url || '')
    }
  }, [user])

  const validateUrl = (url: string) => {
    if (!url) return true // Empty URL is valid
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    // Validation
    if (!fullName.trim()) {
      setError('El nombre no puede estar vacío')
      setLoading(false)
      return
    }

    if (avatarUrl && !validateUrl(avatarUrl)) {
      setError('Por favor ingresa una URL válida para el avatar')
      setLoading(false)
      return
    }

    try {
      const { error } = await updateProfile({
        full_name: fullName.trim(),
        avatar_url: avatarUrl.trim() || undefined,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Perfil actualizado correctamente')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      onClose()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-xl w-full max-w-md p-6 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="relative inline-block">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
            ) : null}
            <div className={`w-20 h-20 bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4 ${avatarUrl ? 'hidden' : ''}`}>
              <User size={32} className="text-gray-400" />
            </div>
            <button 
              type="button"
              className="absolute bottom-4 right-0 bg-secondary p-2 rounded-full text-white hover:bg-accent transition-colors"
            >
              <Camera size={16} />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
          <p className="text-gray-400 text-sm mt-1">
            Miembro desde {new Date(user.created_at || '').toLocaleDateString()}
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-500 rounded-lg text-green-300 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-300 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full bg-surface-dark border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-gray-400 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              El email no se puede cambiar
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre completo *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface-dark border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors"
                placeholder="Tu nombre completo"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL del Avatar
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-surface-dark border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors"
              placeholder="https://ejemplo.com/avatar.jpg"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              URL de imagen para tu avatar (opcional)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <Save size={20} />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-600">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
            disabled={loading}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile