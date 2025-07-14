import React, { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthMode = 'signin' | 'signup' | 'reset'

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { signIn, signUp, resetPassword } = useAuth()

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setMessage('')
    setError('')
    setShowPassword(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          onClose()
          resetForm()
        }
      } else if (mode === 'signup') {
        const { error } = await signUp(email, password, fullName)
        if (error) {
          setError(error.message)
        } else {
          setMessage('¡Cuenta creada! Revisa tu email para confirmar tu cuenta.')
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email)
        if (error) {
          setError(error.message)
        } else {
          setMessage('Se ha enviado un enlace de recuperación a tu email.')
        }
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode)
    resetForm()
  }

  if (!isOpen) return null

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
          <img src="/Content/logo.png" alt="Nime" className="h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">
            {mode === 'signin' && 'Iniciar Sesión'}
            {mode === 'signup' && 'Crear Cuenta'}
            {mode === 'reset' && 'Recuperar Contraseña'}
          </h2>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
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
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-dark border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-dark border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
                  placeholder="Tu contraseña"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cargando...' : (
              <>
                {mode === 'signin' && 'Iniciar Sesión'}
                {mode === 'signup' && 'Crear Cuenta'}
                {mode === 'reset' && 'Enviar Enlace'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => switchMode('reset')}
                className="text-secondary hover:text-accent text-sm transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <div className="text-gray-400 text-sm">
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="text-secondary hover:text-accent transition-colors"
                >
                  Regístrate
                </button>
              </div>
            </>
          )}

          {mode === 'signup' && (
            <div className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => switchMode('signin')}
                className="text-secondary hover:text-accent transition-colors"
              >
                Inicia sesión
              </button>
            </div>
          )}

          {mode === 'reset' && (
            <button
              onClick={() => switchMode('signin')}
              className="text-secondary hover:text-accent text-sm transition-colors"
            >
              Volver al inicio de sesión
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal