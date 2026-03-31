'use client'

import { useState } from 'react'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Button } from '../../components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card/Card'
import { Badge } from '../../components/ui/Badge/Badge'
import { Input } from '../../components/ui/Input/Input'

const mockViews = [
  {
    id: 'view-1',
    name: 'Usuarios Activos',
    description: 'Muestra todos los usuarios activos del sistema',
    filters: { status: 'activo' },
    isDefault: true,
    columns: ['nombre', 'email', 'perfil', 'grupo', 'últimoAcceso']
  },
  {
    id: 'view-2',
    name: 'Usuarios por Grupo',
    description: 'Agrupa usuarios por su grupo de trabajo',
    filters: { groupBy: 'grupo' },
    isDefault: false,
    columns: ['grupo', 'count']
  },
  {
    id: 'view-3',
    name: 'Usuarios Bloqueados',
    description: 'Muestra solo usuarios con estado bloqueado',
    filters: { status: 'bloqueado' },
    isDefault: false,
    columns: ['nombre', 'email', 'motivoBloqueo']
  },
]

export default function VistasPage() {
  const [views, setViews] = useState(mockViews)
  const [editingView, setEditingView] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Vistas Personalizadas</h1>
          <p className={styles.description}>
            Crea y gestiona vistas personalizadas de los datos de usuarios
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
          <Icon name="plus" size={16} />
          Nueva Vista
        </Button>
      </div>

      {/* Views Grid */}
      <div className={styles.viewsGrid}>
        {views.map(view => (
          <Card key={view.id} className={styles.viewCard}>
            <CardHeader>
              <div className={styles.viewHeader}>
                <div className={styles.viewIcon}>
                  <Icon name="layoutGrid" size={20} />
                </div>
                <div className={styles.viewInfo}>
                  <CardTitle>{view.name}</CardTitle>
                  <p className={styles.viewDescription}>{view.description}</p>
                </div>
                {view.isDefault && (
                  <Badge variant="primary">Por defecto</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className={styles.viewDetails}>
                <div className={styles.viewDetail}>
                  <span className={styles.viewDetailLabel}>Columnas:</span>
                  <div className={styles.columnTags}>
                    {view.columns.map(col => (
                      <span key={col} className={styles.columnTag}>{col}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.viewActions}>
                <Button variant="secondary" size="sm" className={styles.viewButton}>
                  <Icon name="eye" size={14} />
                  Ver Vista
                </Button>
                <Button variant="ghost" size="sm" className={styles.viewButton}>
                  <Icon name="edit" size={14} />
                </Button>
                {!view.isDefault && (
                  <Button variant="ghost" size="sm" className={styles.viewButton}>
                    <Icon name="trash2" size={14} />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <Card className={styles.infoCard}>
        <CardHeader>
          <CardTitle>Sobre las Vistas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.infoContent}>
            <Icon name="info" size={24} />
            <div>
              <p>
                Las vistas personalizadas te permiten guardar configuraciones de filtros
                y columnas para acceder rápidamente a diferentes perspectivas de los datos.
                Puedes marcar una vista como "Por defecto" para que se cargue automáticamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New View Dialog */}
      {dialogOpen && (
        <div className={styles.dialogOverlay} onClick={() => setDialogOpen(false)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dialogHeader}>
              <h2>Nueva Vista</h2>
              <button className={styles.closeButton} onClick={() => setDialogOpen(false)}>
                <Icon name="x" size={20} />
              </button>
            </div>
            <div className={styles.dialogContent}>
              <div className={styles.formGroup}>
                <label>Nombre de la vista</label>
                <Input placeholder="Ej: Usuarios por departamento" />
              </div>
              <div className={styles.formGroup}>
                <label>Descripción</label>
                <Input placeholder="Describe qué muestra esta vista..." />
              </div>
              <div className={styles.formGroup}>
                <label>Filtros a aplicar</label>
                <Input placeholder="Ej: estado=activo, grupo=Gestión" />
              </div>
            </div>
            <div className={styles.dialogFooter}>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary">
                Crear Vista
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
