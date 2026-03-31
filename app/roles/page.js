'use client'

import { useState } from 'react'
import { mockCustomRoles } from '../../lib/mockData'
import { mockProducts } from '../../lib/mockData'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Button } from '../../components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card/Card'
import { Badge } from '../../components/ui/Badge/Badge'

export default function RolesPage() {
  const [selectedProduct, setSelectedProduct] = useState('1')

  const rolesByProduct = mockCustomRoles.filter(r => r.productId === selectedProduct)
  const product = mockProducts.find(p => p.id === selectedProduct)

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Roles</h1>
          <p className={styles.description}>
            Configura los permisos para cada producto del sistema
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Icon name="plus" size={16} />
          Nuevo Rol
        </Button>
      </div>

      {/* Product Tabs */}
      <div className={styles.productTabs}>
        {mockProducts.map(p => (
          <button
            key={p.id}
            className={`${styles.productTab} ${selectedProduct === p.id ? styles.active : ''}`}
            onClick={() => setSelectedProduct(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Roles Grid */}
      <div className={styles.rolesGrid}>
        {rolesByProduct.map(role => (
          <Card key={role.id}>
            <CardHeader>
              <div className={styles.roleHeader}>
                <CardTitle>{role.name}</CardTitle>
                {!role.isSystem && (
                  <Badge variant="outline">Personalizado</Badge>
                )}
              </div>
              <p className={styles.roleDescription}>{role.description}</p>
            </CardHeader>
            <CardContent>
              <div className={styles.permissions}>
                <h4 className={styles.permissionsTitle}>Permisos:</h4>
                <ul className={styles.permissionsList}>
                  {Object.entries(role.permissions).map(([key, value]) => (
                    <li key={key} className={styles.permissionItem}>
                      <Icon
                        name={value ? 'check' : 'x'}
                        size={16}
                        style={{ color: value ? 'var(--color-success)' : 'var(--color-text-muted)' }}
                      />
                      <span>{formatPermissionName(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.roleActions}>
                <Button variant="secondary" size="sm" className={styles.actionButton}>
                  <Icon name="edit" size={14} />
                  Editar
                </Button>
                {!role.isSystem && (
                  <Button variant="danger" size="sm" className={styles.actionButton}>
                    <Icon name="trash2" size={14} />
                    Eliminar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className={styles.infoCard}>
        <CardContent>
          <div className={styles.infoContent}>
            <Icon name="info" size={24} />
            <div>
              <h4>Roles del Sistema</h4>
              <p>
                Los roles Básico y Avanzado son roles predefinidos del sistema.
                Puedes crear roles personalizados con permisos específicos según tus necesidades.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function formatPermissionName(key) {
  const names = {
    alarmasNivel1y2: 'Alarmas Nivel 1 y 2',
    todasLasAlarmas: 'Todas las alarmas',
    compartirEventosNotificaciones: 'Compartir eventos y notificaciones',
    verDatos: 'Ver datos',
    exportarDatos: 'Exportar datos',
    configurarParametros: 'Configurar parámetros',
    verMediciones: 'Ver mediciones',
    crearMediciones: 'Crear mediciones',
    exportarReportes: 'Exportar reportes',
    verDashboards: 'Ver dashboards',
    crearDashboards: 'Crear dashboards',
    configurarAlertas: 'Configurar alertas',
  }
  return names[key] || key
}
