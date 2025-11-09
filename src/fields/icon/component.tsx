'use client'

import './style.css'
import React, { type CSSProperties, useCallback, useMemo } from 'react'
import { FieldLabel, ReactSelect, type ReactSelectOption, useField } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'
import type { Option } from '@payloadcms/ui/elements/ReactSelect'
import { List } from 'react-window'

const ICON_BASE_URL = 'https://cdn.jsdelivr.net/npm/lucide-static@0.508.0/icons/'

const IconPreview: React.FC<{ name: string }> = React.memo(({ name }) => (
  <img
    src={`${ICON_BASE_URL}${name}.svg`}
    alt={name}
    width={20}
    height={20}
    loading="lazy"
    className="icon-preview"
  />
))

IconPreview.displayName = 'IconPreview'

const CustomOption: React.FC<ReactSelectOption> = ({ data, innerProps, isSelected }: any) => (
  <div {...innerProps} className={`custom-option ${isSelected ? 'focused' : ''}`}>
    <IconPreview name={data.value} />
    {data.label}
  </div>
)

const SingleValue: React.FC<ReactSelectOption> = ({ data }: any) => (
  <div className="custom-single-value">
    <IconPreview name={data.value} />
    {data.label}
  </div>
)

const ITEM_HEIGHT = 36

type RowAdditionalProps = {
  items: React.ReactNode[]
}

type RowComponentProps = RowAdditionalProps & {
  index: number
  style: React.CSSProperties
  ariaAttributes: {
    'aria-posinset': number
    'aria-setsize': number
    role: 'listitem'
  }
}

const RowComponent = ({ index, style, items }: RowComponentProps): React.ReactElement => {
  const child = items[index] ?? null

  return <div style={style}>{child}</div>
}

RowComponent.displayName = 'VirtualizedRow'

const VirtualMenuList: React.FC<any> = ({ children, maxHeight }) => {
  const items = React.Children.toArray(children)
  const itemCount = items.length
  const listHeight = Math.min(maxHeight, itemCount * ITEM_HEIGHT)

  return (
    <List
      defaultHeight={listHeight}
      rowCount={itemCount}
      rowHeight={ITEM_HEIGHT}
      rowComponent={RowComponent}
      rowProps={{ items } satisfies RowAdditionalProps}
      style={{ height: listHeight, width: '100%' }}
    />
  )
}

const reactSelectComponents = {
  Option: CustomOption,
  SingleValue,
  MenuList: VirtualMenuList,
}

const IconComponent: SelectFieldClientComponent = ({ field, path }) => {
  const { label, admin, hasMany = false } = field
  const { value, setValue } = useField({ path: path })
  const placeholder =
    typeof admin?.placeholder === 'function'
      ? admin?.placeholder(field)
      : admin?.placeholder || 'Search for icon...'
  const isClearable = admin?.isClearable === false ? undefined : true
  const className = admin?.className

  const options = useMemo(() => field.options as Option[], [field.options])

  const currentOption = useMemo(() => {
    return options.find((option) => option.value === value) as Option | undefined
  }, [options, value])

  const handleChange = useCallback(
    (selected: Option | null) => {
      setValue(selected ? selected.value : null)
    },
    [setValue],
  )

  return (
    <div
      className="field-type select icon-field-component"
      style={{ '--field-width': field?.admin?.width || undefined } as CSSProperties}
    >
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
      </div>

      <ReactSelect
        value={currentOption}
        placeholder={placeholder}
        onChange={(opt) => handleChange(opt as Option | null)}
        isClearable={isClearable}
        options={options}
        components={reactSelectComponents}
        className={className}
        isCreatable={false}
        isMulti={hasMany}
      />
    </div>
  )
}

export { IconComponent }
