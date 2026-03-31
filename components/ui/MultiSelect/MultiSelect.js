'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './MultiSelect.module.css'

export function MultiSelect({ options, value, onChange, placeholder = 'Seleccionar...' }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (optionValue) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  const toggleAll = () => {
    if (value.length === options.length) {
      onChange([])
    } else {
      onChange(options.map(o => o.value))
    }
  }

  const isAllSelected = value.length === options.length
  const selectedCount = value.length

  const getDisplayText = () => {
    if (selectedCount === 0) return placeholder
    if (selectedCount === 1) {
      const opt = options.find(o => o.value === value[0])
      return opt ? opt.label : placeholder
    }
    if (isAllSelected) return 'Todos seleccionados'
    return `${selectedCount} seleccionados`
  }

  return (
    <div className={styles.multiSelect} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selected}>{getDisplayText()}</span>
        <Icon name="chevronDown" size={16} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <label className={styles.selectAll}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={() => toggleAll()}
              />
              <span>Todos</span>
            </label>
          </div>
          <div className={styles.options}>
            {options.map(option => (
              <label key={option.value} className={styles.option}>
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
