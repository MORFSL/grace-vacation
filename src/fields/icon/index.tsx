import type { SelectField } from 'payload'
import iconNodes from 'lucide-static/icon-nodes.json'

export type IconOption = {
  value: string
  label: string
}

export type IconField = (overrides?: Partial<SelectField>) => SelectField

const iconField: IconField = (overrides = {}) => {
  const baseField = {
    name: 'icon',
    ...overrides,
    type: 'select',
    interfaceName: 'LucideIcon',
    required: false,
    hasMany: false,
    options: Object.keys(iconNodes).map((slug) => {
      const label = slug
        .split('-')
        .map((segment) => {
          if (/^\d+$/.test(segment)) return segment

          return segment
            .replace(/^[a-z]/, (c) => c.toUpperCase())
            .replace(/(\d)([a-z])/g, (_, d, l) => d + l.toUpperCase())
        })
        .join(' ')

      return {
        value: slug,
        label,
      }
    }),
    admin: {
      ...overrides.admin,
      components: {
        ...overrides.admin?.components,
        Field: {
          path: '@/fields/icon/component#IconComponent',
        },
      },
    },
  } as SelectField

  return baseField
}

export { iconField }
