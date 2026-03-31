import styles from './Button.module.css'

export function Button({ children, variant = 'primary', size = 'md', disabled = false, type = 'button', onClick, className = '', ...props }) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
