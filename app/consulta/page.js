'use client'

import { useState, useMemo } from 'react'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Button } from '../../components/ui/Button/Button'
import { Input } from '../../components/ui/Input/Input'
import { MultiSelect } from '../../components/ui/MultiSelect/MultiSelect'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table/Table'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '../../components/ui/Dialog/Dialog'

// Opciones para los filtros
const ESTADOS_OPTIONS = [
  { value: 'activa', label: 'Activa' },
  { value: 'archivada', label: 'Archivada' },
  { value: 'borrador', label: 'Borrador' }
]

const TIPOS_OPTIONS = [
  { value: 'usuarios', label: 'Usuarios' },
  { value: 'grupos', label: 'Grupos' },
  { value: 'roles', label: 'Roles' },
  { value: 'licencias', label: 'Licencias' }
]

// Datos de ejemplo para las consultas
const initialConsultas = [
  {
    id: 'consulta-1',
    name: 'Usuarios Activos Gestión',
    creator: 'María García',
    creatorUsername: '@mgarcia',
    type: 'usuarios',
    createdAt: '2024-01-15',
    status: 'activa',
    filters: ['Estado: Activo', 'Grupo: Gestión']
  },
  {
    id: 'consulta-2',
    name: 'Técnicos Flota 1',
    creator: 'Juan López',
    creatorUsername: '@jlopez',
    type: 'usuarios',
    createdAt: '2024-01-18',
    status: 'activa',
    filters: ['Flota: Flota 1', 'Grupo: Mantenimiento']
  },
  {
    id: 'consulta-3',
    name: 'Usuarios Pool CAF',
    creator: 'Ana Martínez',
    creatorUsername: '@amartinez',
    type: 'usuarios',
    createdAt: '2024-01-20',
    status: 'activa',
    filters: ['Pool: CAF']
  },
  {
    id: 'consulta-4',
    name: 'Roles Avanzados',
    creator: 'Carlos Ruiz',
    creatorUsername: '@cruiz',
    type: 'roles',
    createdAt: '2024-01-22',
    status: 'activa',
    filters: ['Nivel: Avanzado']
  },
  {
    id: 'consulta-5',
    name: 'Grupos Solapados',
    creator: 'María García',
    creatorUsername: '@mgarcia',
    type: 'grupos',
    createdAt: '2024-01-10',
    status: 'archivada',
    filters: ['Solapamiento: Sí']
  },
  {
    id: 'consulta-6',
    name: 'Licencias Próximas a Expirar',
    creator: 'Laura Díaz',
    creatorUsername: '@ldiaz',
    type: 'licencias',
    createdAt: '2024-01-25',
    status: 'borrador',
    filters: ['Licencia: < 5 disponibles']
  },
  {
    id: 'consulta-7',
    name: 'Usuarios Sin Acceso',
    creator: 'Pedro Sánchez',
    creatorUsername: '@psanchez',
    type: 'usuarios',
    createdAt: '2024-01-28',
    status: 'activa',
    filters: ['Último acceso: Nunca', 'Estado: Activo']
  },
  {
    id: 'consulta-8',
    name: 'Analytics Product Access',
    creator: 'Juan López',
    creatorUsername: '@jlopez',
    type: 'usuarios',
    createdAt: '2024-02-01',
    status: 'activa',
    filters: ['Producto: Advanced Analytics', 'Rol: > Reader']
  }
]

export default function ConsultaPage() {
  const [consultas, setConsultas] = useState(initialConsultas)
  const [searchTerm, setSearchTerm] = useState('')
  const [estadosFilter, setEstadosFilter] = useState(ESTADOS_OPTIONS.map(o => o.value))
  const [tiposFilter, setTiposFilter] = useState(TIPOS_OPTIONS.map(o => o.value))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingConsulta, setEditingConsulta] = useState(null)
  const [nombreConsulta, setNombreConsulta] = useState('')
  const [tipoConsulta, setTipoConsulta] = useState('usuarios')

  // Aplicar filtros
  const filteredConsultas = useMemo(() => {
    return consultas.filter(consulta => {
      // Búsqueda por nombre
      const matchesSearch = searchTerm === '' ||
        consulta.name.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de estados
      const matchesEstado = estadosFilter.length === 0 || estadosFilter.includes(consulta.status)

      // Filtro de tipos
      const matchesTipo = tiposFilter.length === 0 || tiposFilter.includes(consulta.type)

      return matchesSearch && matchesEstado && matchesTipo
    })
  }, [consultas, searchTerm, estadosFilter, tiposFilter])

  const handleDeleteConsulta = (consultaId) => {
    setConsultas(consultas.filter(c => c.id !== consultaId))
  }

  const handleArchiveConsulta = (consulta) => {
    setConsultas(consultas.map(c =>
      c.id === consulta.id
        ? { ...c, status: c.status === 'activa' ? 'archivada' : 'activa' }
        : c
    ))
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'activa':
        return <span className={styles.statusActive}>Activa</span>
      case 'archivada':
        return <span className={styles.statusArchived}>Archivada</span>
      case 'borrador':
        return <span className={styles.statusDraft}>Borrador</span>
      default:
        return <span className={styles.textMuted}>{status}</span>
    }
  }

  const getTypeDisplay = (type) => {
    const typeLabels = {
      usuarios: 'Usuarios',
      grupos: 'Grupos',
      roles: 'Roles',
      licencias: 'Licencias'
    }
    return typeLabels[type] || type
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const openCreateDialog = () => {
    setEditingConsulta(null)
    setNombreConsulta('')
    setTipoConsulta('usuarios')
    setDialogOpen(true)
  }

  const openEditDialog = (consulta) => {
    setEditingConsulta(consulta)
    setNombreConsulta(consulta.name)
    setTipoConsulta(consulta.type)
    setDialogOpen(true)
  }

  const handleCreateConsulta = () => {
    if (!nombreConsulta.trim()) return

    const newConsulta = {
      id: `consulta-${Date.now()}`,
      name: nombreConsulta.trim(),
      creator: 'Usuario Actual',
      creatorUsername: '@usuario',
      type: tipoConsulta,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'borrador',
      filters: []
    }

    setConsultas([newConsulta, ...consultas])
    resetForm()
    setDialogOpen(false)
  }

  const handleEditConsulta = () => {
    if (!nombreConsulta.trim()) return

    setConsultas(consultas.map(c =>
      c.id === editingConsulta.id
        ? { ...c, name: nombreConsulta.trim(), type: tipoConsulta }
        : c
    ))

    resetForm()
    setDialogOpen(false)
    setEditingConsulta(null)
  }

  const resetForm = () => {
    setNombreConsulta('')
    setTipoConsulta('usuarios')
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Consulta</h1>
          <p className={styles.description}>
            Gestiona tus consultas y vistas personalizadas de datos
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateDialog}>
          <Icon name="plus" size={16} />
          Nueva Consulta
        </Button>
      </div>

      {/* Filtros */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <div className={styles.searchBox}>
            <Icon name="search" size={18} />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <MultiSelect
            options={ESTADOS_OPTIONS}
            value={estadosFilter}
            onChange={setEstadosFilter}
            placeholder="Estados"
          />
        </div>

        <div className={styles.filterGroup}>
          <MultiSelect
            options={TIPOS_OPTIONS}
            value={tiposFilter}
            onChange={setTiposFilter}
            placeholder="Tipos"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre vista</TableHead>
              <TableHead>Usuario creador</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Filtros aplicados</TableHead>
              <TableHead style={{ textAlign: 'right' }}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsultas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className={styles.emptyState}>
                    <Icon name="search" size={48} />
                    <p>No se encontraron consultas</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredConsultas.map(consulta => (
              <TableRow key={consulta.id}>
                <TableCell className={styles.nameCell}>
                  <span className={styles.consultaName}>{consulta.name}</span>
                </TableCell>
                <TableCell>
                  <div className={styles.creatorCell}>
                    <span className={styles.creatorName}>{consulta.creator}</span>
                    <span className={styles.creatorUsername}>{consulta.creatorUsername}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={styles.typeBadge}>{getTypeDisplay(consulta.type)}</span>
                </TableCell>
                <TableCell>{formatDate(consulta.createdAt)}</TableCell>
                <TableCell>{getStatusBadge(consulta.status)}</TableCell>
                <TableCell>
                  <div className={styles.filtersCell}>
                    {consulta.filters.map((filter, index) => (
                      <span key={index} className={styles.filterTag}>{filter}</span>
                    ))}
                    {consulta.filters.length === 0 && (
                      <span className={styles.textMuted}>—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.rowActions}>
                    <button
                      className={styles.iconButton}
                      onClick={() => openEditDialog(consulta)}
                      title="Editar"
                    >
                      <Icon name="eye" size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      onClick={() => openEditDialog(consulta)}
                      title="Editar"
                    >
                      <Icon name="edit" size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleArchiveConsulta(consulta)}
                      title={consulta.status === 'activa' ? 'Archivar' : 'Activar'}
                    >
                      <Icon name={consulta.status === 'activa' ? 'archive' : 'box'} size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleDeleteConsulta(consulta.id)}
                      title="Eliminar"
                    >
                      <Icon name="trash2" size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Info Card */}
      <div className={styles.infoCard}>
        <Icon name="info" size={20} />
        <p>
          Las consultas te permiten guardar filtros personalizados para acceder rápidamente a diferentes vistas de los datos.
          Puedes crear consultas de usuarios, grupos, roles y licencias.
        </p>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} size="md">
        <DialogHeader>
          <DialogTitle>{editingConsulta ? 'Editar Consulta' : 'Nueva Consulta'}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className={styles.formGroup}>
            <label>Nombre de la consulta *</label>
            <Input
              placeholder="Ej: Usuarios Activos Gestión"
              value={nombreConsulta}
              onChange={(e) => setNombreConsulta(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Tipo de consulta *</label>
            <select
              className={styles.select}
              value={tipoConsulta}
              onChange={(e) => setTipoConsulta(e.target.value)}
            >
              {TIPOS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={editingConsulta ? handleEditConsulta : handleCreateConsulta}
            disabled={!nombreConsulta.trim()}
          >
            {editingConsulta ? 'Guardar Cambios' : 'Crear Consulta'}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
