import styles from './Checkbox.module.css'

export function Checkbox({ checked = false, onChange, disabled = false, id, label, className = '' }) {
  return (
    <label className={`${styles.checkbox} ${disabled && styles.disabled} ${className}`.trim()}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.box}>
        {checked && <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
