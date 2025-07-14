import React, { useState } from 'react'
import { X, User, Mail, Camera, Save } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, signOut } = useAuth()
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Perfil actualizado correctamente')
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-xl w-full max-w-md p-6 relative">
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
              />
            ) : (
              <div className="w-20 h-20 bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-gray-400" />
              </div>
            )}
            <button className="absolute bottom-4 right-0 bg-secondary p-2 rounded-full text-white hover:bg-accent transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-500 rounded-lg text-green-300 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-300 text-sm">
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
                value={user.email}
                disabled
                className="w-full bg-surface-dark border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface-dark border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
                placeholder="Tu nombre completo"
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
              className="w-full bg-surface-dark border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
              placeholder="https://ejemplo.com/avatar.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-600">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile