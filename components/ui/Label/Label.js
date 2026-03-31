import styles from './Label.module.css'

export function Label({ htmlFor, children, required = false, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${className}`.trim()}>
      {children}
      {required && <span className={styles.required}> *</span>}
    </label>
  )
}
