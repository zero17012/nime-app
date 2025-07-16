import { Category } from '../types'

export const categories: Category[] = [
  { id: 'home', name: 'Inicio', icon: 'Home' },
  { id: 'entertainment', name: 'Entretenimiento', icon: 'Film' },
  {
    id: 'apps',
    name: 'Aplicaciones',
    icon: 'LayoutGrid',
    subcategories: [
      { id: 'development', name: 'Desarrollo', icon: 'Code' },
      { id: 'productivity', name: 'Productividad', icon: 'Briefcase' },
      { id: 'design', name: 'Diseño', icon: 'Palette' },
      { id: 'entertainment', name: 'Entretenimiento', icon: 'Film' }
    ]
  },
  { id: 'games', name: 'Juegos', icon: 'Gamepad2' },
]

export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id)
}