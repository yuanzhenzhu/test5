import styles from './Separator.module.css'

export function Separator({ orientation = 'horizontal', className = '' }) {
  return (
    <div className={`${styles.separator} ${styles[orientation]} ${className}`.trim()} />
  )
}
