import styles from './Card.module.css'

export function Card({ children, className = '' }) {
  return <div className={`${styles.card} ${className}`.trim()}>{children}</div>
}

export function CardHeader({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`.trim()}>{children}</div>
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`${styles.title} ${className}`.trim()}>{children}</h3>
}

export function CardDescription({ children, className = '' }) {
  return <p className={`${styles.description} ${className}`.trim()}>{children}</p>
}

export function CardContent({ children, className = '' }) {
  return <div className={`${styles.content} ${className}`.trim()}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return <div className={`${styles.footer} ${className}`.trim()}>{children}</div>
}
