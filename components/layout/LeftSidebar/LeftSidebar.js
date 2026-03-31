'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './LeftSidebar.module.css'
import { Icon } from '../../ui/Icon/Icon'
import { Select } from '../../ui/Select/Select'
import { mockUsers, mockClient } from '../../../lib/mockData'

const menuItems = [
  { id: 'usuarios', label: 'Listado de usuarios', icon: 'list' },
  { id: 'grupos', label: 'Gestión de grupos', icon: 'users' },
  { id: 'roles', label: 'Gestión de roles', icon: 'userCog' },
  { id: 'plantillas', label: 'Plantillas', icon: 'fileText' },
  { id: 'consulta', label: 'Consulta', icon: 'search' },
]

export function LeftSidebar() {
  const pathname = usePathname()
  const activeSection = pathname?.split('/')?.[1] || 'usuarios'

  // Calcular usuarios de Pool Cliente (sin CAF)
  const clientUsers = mockUsers.filter(u => u.poolClient === 'Pool Cliente')
  const userCount = clientUsers.length
  const userLimit = mockClient.userLimit

  return (
    <aside className={styles.sidebar}>
      <div className={styles.content}>
        {/* Organization Select */}
        <div className={styles.selectContainer}>
          <label className={styles.label}>Organización</label>
          <Select
            value="actren"
            onChange={() => {}}
            options={[
              { value: 'actren', label: 'Actren' },
              { value: 'demo', label: 'Demo' }
            ]}
          />
        </div>

        {/* Licencia card */}
        <div className={styles.licenseCard}>
          <p className={styles.licenseTitle}>Licencia Contratada</p>
          <p className={styles.licenseInfo}>{userCount} usuarios de {userLimit} usuarios</p>
        </div>

        {/* Navigation Menu */}
        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
