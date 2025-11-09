'use client'

import rawIconNodes from 'lucide-static/icon-nodes.json'
import { createLucideIcon } from 'lucide-react'
import { memo, type ComponentType, type SVGProps } from 'react'

type IconName = keyof typeof rawIconNodes
type IconNode = [string, Record<string, string>][]

type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  size?: string | number
  absoluteStrokeWidth?: boolean
}

type IconComponent = ComponentType<IconProps>

const iconNodes = rawIconNodes as Record<IconName, IconNode>
const iconComponents = new Map<IconName, IconComponent>()

const getIconComponent = (name: IconName) => {
  if (!iconComponents.has(name)) {
    const iconNode = iconNodes[name]

    if (!iconNode) {
      return null
    }

    iconComponents.set(name, createLucideIcon(name, iconNode) as IconComponent)
  }

  return iconComponents.get(name) ?? null
}

type DynamicIconProps = {
  name: IconName
} & IconProps

const DynamicIcon = memo(({ name, ...props }: DynamicIconProps) => {
  const Icon = getIconComponent(name)

  if (!Icon) return null

  return <Icon {...props} />
})
DynamicIcon.displayName = 'DynamicIcon'

export default DynamicIcon
