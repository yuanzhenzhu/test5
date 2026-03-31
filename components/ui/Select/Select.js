'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './Select.module.css'
import { Icon } from '../Icon/Icon'

export function Select({ value = '', onChange, options = [], placeholder = 'Seleccionar...', disabled = false, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (optValue) => {
    onChange(optValue)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className={`${styles.select} ${disabled && styles.disabled} ${className}`.trim()}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={selectedOption ? styles.selected : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon name="chevronDown" size={16} className={isOpen ? styles.open : ''} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${option.value === value ? styles.active : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
