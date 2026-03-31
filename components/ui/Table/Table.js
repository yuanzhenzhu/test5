import styles from './Table.module.css'

export function Table({ children, className = '' }) {
  return <table className={`${styles.table} ${className}`.trim()}>{children}</table>
}

export function TableHeader({ children }) {
  return <thead className={styles.thead}>{children}</thead>
}

export function TableBody({ children }) {
  return <tbody className={styles.tbody}>{children}</tbody>
}

export function TableRow({ children, onClick, className = '' }) {
  return (
    <tr className={`${styles.tr} ${onClick ? styles.clickable : ''} ${className}`.trim()} onClick={onClick}>
      {children}
    </tr>
  )
}

export function TableHead({ children, className = '' }) {
  return <th className={`${styles.th} ${className}`.trim()}>{children}</th>
}

export function TableCell({ children, className = '' }) {
  return <td className={`${styles.td} ${className}`.trim()}>{children}</td>
}
