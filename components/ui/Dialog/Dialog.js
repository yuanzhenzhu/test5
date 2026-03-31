'use client'

import { useEffect, useRef } from 'react'
import styles from './Dialog.module.css'
import { Icon } from '../Icon/Icon'

export function Dialog({ open = false, onClose, children, size = 'md', showClose = true }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      dialogRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {showClose && (
          <button className={styles.closeButton} onClick={onClose}>
            <Icon name="x" size={20} />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`.trim()}>{children}</div>
}

export function DialogTitle({ children }) {
  return <h2 className={styles.title}>{children}</h2>
}

export function DialogContent({ children, className = '' }) {
  return <div className={`${styles.content} ${className}`.trim()}>{children}</div>
}

export function DialogFooter({ children, className = '' }) {
  return <div className={`${styles.footer} ${className}`.trim()}>{children}</div>
}
