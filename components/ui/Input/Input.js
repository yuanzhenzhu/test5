import styles from './Input.module.css'

export function Input({ type = 'text', value = '', onChange, placeholder = '', disabled = false, error = '', id, name, className = '', ...props }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${styles.input} ${error && styles.error} ${className}`.trim()}
      {...props}
    />
  )
}
