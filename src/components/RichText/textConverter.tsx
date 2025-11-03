import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedTextNode } from '@payloadcms/richtext-lexical'
import type {
  StateValues,
  TextStateFeatureProps,
} from 'node_modules/@payloadcms/richtext-lexical/dist/features/textState/feature.server'
import React from 'react'

const colorState: TextStateFeatureProps['state'] = {
  color: {
    primaryColor: {
      label: 'Primary Color',
      css: {
        color: 'rgb(var(--primary))',
      },
    },
    primaryBackground: {
      label: 'Primary Background',
      css: {
        'background-color': 'rgb(var(--primary))',
      },
    },
  },
}

type ExtractAllColorKeys<T> = {
  [P in keyof T]: T[P] extends StateValues ? keyof T[P] : never
}[keyof T]

type ColorStateKeys = ExtractAllColorKeys<typeof colorState>

export const textConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }) => {
    const styles: React.CSSProperties = {}

    if (node.$) {
      Object.entries(colorState).forEach(([stateKey, stateValues]) => {
        const stateValue = node.$ && (node.$[stateKey] as ColorStateKeys)

        if (stateValue && stateValues[stateValue]) {
          Object.assign(styles, stateValues[stateValue].css)
        }
      })
    }

    if (node.format) {
      return <strong style={styles}>{node.text}</strong>
    }

    if (node.$ && Object.keys(styles).length > 0) {
      return <span style={styles}>{node.text}</span>
    }

    return node.text
  },
}
