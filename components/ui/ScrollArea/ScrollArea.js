import styles from './ScrollArea.module.css'

export function ScrollArea({ children, className = '' }) {
  return (
    <div className={`${styles.scrollArea} ${className}`.trim()}>
      {children}
    </div>
  )
}
