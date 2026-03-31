'use client'

import { useState } from 'react'
import styles from './Tabs.module.css'

export function Tabs({ defaultValue = '', children, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <div className={`${styles.tabs} ${className}`.trim()}>
      {children.map((child, index) => {
        if (child.type === TabsList) {
          return <child.type key={index} {...child.props} activeTab={activeTab} onTabChange={setActiveTab} />
        }
        if (child.type === TabsContent) {
          return child.props.value === activeTab ? <child.type key={index} {...child.props} /> : null
        }
        return child
      })}
    </div>
  )
}

export function TabsList({ children, activeTab, onTabChange, className = '' }) {
  return (
    <div className={`${styles.list} ${className}`.trim()}>
      {children.map((child, index) => (
        <child.type
          key={index}
          {...child.props}
          active={child.props.value === activeTab}
          onClick={() => onTabChange(child.props.value)}
        />
      ))}
    </div>
  )
}

export function TabsTrigger({ value, children, active = false, onClick, disabled = false, className = '' }) {
  return (
    <button
      className={`${styles.trigger} ${active && styles.active} ${disabled && styles.disabled} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = '' }) {
  return <div className={`${styles.content} ${className}`.trim()}>{children}</div>
}
