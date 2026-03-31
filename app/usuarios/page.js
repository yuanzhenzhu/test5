'use client'

import { useState, useMemo } from 'react'
import { mockUsers, mockCustomRoles, mockProducts, mockFleets } from '../../lib/mockData'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Button } from '../../components/ui/Button/Button'
import { MultiSelect } from '../../components/ui/MultiSelect/MultiSelect'
import { Input } from '../../components/ui/Input/Input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table/Table'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '../../components/ui/Dialog/Dialog'

// Opciones para los filtros
const ESTADOS_OPTIONS = [
  { value: 'activo', label: 'Activo' },
  { value: 'bloqueado', label: 'Bloqueado' }
]

const FLOTAS_OPTIONS = [
  { value: 'fleet-1', label: 'Flota 1' },
  { value: 'fleet-2', label: 'Flota 2' },
  { value: 'fleet-3', label: 'Flota 3' }
]

const PRODUCTOS_OPTIONS = [
  { value: '1', label: 'Fleet Management' },
  { value: '2', label: 'E&D' },
  { value: '3', label: 'Wayside' },
  { value: '4', label: 'Advanced Analytics' }
]

const POOLS_OPTIONS = [
  { value: 'Pool Cliente', label: 'Pool Cliente' },
  { value: 'Pool CAF', label: 'Pool CAF' }
]

const GRUPOS_OPTIONS = [
  { value: 'Gestión', label: 'Gestión' },
  { value: 'Operaciones', label: 'Operaciones' },
  { value: 'Mantenimiento', label: 'Mantenimiento' },
  { value: 'Supervisión', label: 'Supervisión' },
  { value: 'Análisis', label: 'Análisis' },
  { value: 'Administración CAF', label: 'Administración CAF' },
  { value: 'Soporte CAF', label: 'Soporte CAF' },
  { value: 'Análisis CAF', label: 'Análisis CAF' },
  { value: 'Supervisión CAF', label: 'Supervisión CAF' },
  { value: 'Mantenimiento CAF', label: 'Mantenimiento CAF' },
  { value: 'Coordinación CAF', label: 'Coordinación CAF' },
  { value: 'Especialistas CAF', label: 'Especialistas CAF' }
]

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 por página' },
  { value: 20, label: '20 por página' },
  { value: 50, label: '50 por página' }
]

export default function UsuariosPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [estadosFilter, setEstadosFilter] = useState(ESTADOS_OPTIONS.map(o => o.value))
  const [flotasFilter, setFlotasFilter] = useState(FLOTAS_OPTIONS.map(o => o.value))
  const [productosFilter, setProductosFilter] = useState(PRODUCTOS_OPTIONS.map(o => o.value))
  const [poolsFilter, setPoolsFilter] = useState(POOLS_OPTIONS.map(o => o.value))
  const [gruposFilter, setGruposFilter] = useState(GRUPOS_OPTIONS.map(o => o.value))
  const [selectedUsers, setSelectedUsers] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Aplicar filtros
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Búsqueda por nombre o usuario
      const matchesSearch = searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de estados
      const matchesEstado = estadosFilter.length === 0 || estadosFilter.includes(user.status)

      // Filtro de pools
      const matchesPool = poolsFilter.length === 0 || poolsFilter.includes(user.poolClient)

      // Filtro de grupos
      const matchesGrupo = gruposFilter.length === 0 || gruposFilter.includes(user.grupo)

      // Filtro de flotas (verificar si el usuario tiene alguna de las flotas seleccionadas)
      const userFleetIds = new Set()
      user.productPermissions?.forEach(pp => {
        pp.fleetIds?.forEach(fid => userFleetIds.add(fid))
      })
      // Si no hay filtros de flotas seleccionados, mostrar todos
      // Si hay filtros seleccionados y el usuario no tiene flotas, también mostrarlo
      const hasUserFleets = userFleetIds.size > 0
      const matchesFlota = flotasFilter.length === 0 ||
        !hasUserFleets ||
        Array.from(userFleetIds).some(fid => flotasFilter.includes(fid))

      // Filtro de productos (verificar si el usuario tiene alguno de los productos seleccionados con rol)
      const userProductIds = user.productPermissions
        ?.filter(pp => pp.roleId)
        .map(pp => pp.productId) || []
      // Si no hay filtros de productos seleccionados, mostrar todos
      // Si hay filtros seleccionados y el usuario no tiene productos, también mostrarlo
      const hasUserProducts = userProductIds.length > 0
      const matchesProducto = productosFilter.length === 0 ||
        !hasUserProducts ||
        userProductIds.some(pid => productosFilter.includes(pid))

      return matchesSearch && matchesEstado && matchesPool && matchesGrupo && matchesFlota && matchesProducto
    })
  }, [users, searchTerm, estadosFilter, flotasFilter, productosFilter, poolsFilter, gruposFilter])

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  // Stats
  const activeCount = users.filter(u => u.status === 'activo').length
  const blockedCount = users.filter(u => u.status === 'bloqueado').length

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map(u => u.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    }
  }

  const handleBlockUser = (user) => {
    setUsers(users.map(u =>
      u.id === user.id
        ? { ...u, status: u.status === 'activo' ? 'bloqueado' : 'activo' }
        : u
    ))
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId))
    setSelectedUsers(selectedUsers.filter(id => id !== userId))
  }

  const getStatusBadge = (status) => {
    return status === 'activo'
      ? <span className={styles.statusActive}>Activo</span>
      : <span className={styles.statusBlocked}>Bloqueado</span>
  }

  const getPoolBadge = (pool) => {
    return pool === 'Pool Cliente'
      ? <span className={styles.poolClient}>Cliente</span>
      : <span className={styles.poolCaf}>CAF</span>
  }

  const getFlotasDisplay = (user) => {
    const allFleetIds = new Set()
    user.productPermissions?.forEach(pp => {
      pp.fleetIds?.forEach(fid => allFleetIds.add(fid))
    })
    if (allFleetIds.size === 0) return <span className={styles.textMuted}>—</span>
    const fleetNumbers = Array.from(allFleetIds).map(fid => {
      const fleet = mockFleets.find(f => f.id === fid)
      return fleet ? fleet.name.replace('Flota ', '') : ''
    }).filter(Boolean)
    return <span className={styles.productTags}>{fleetNumbers.join(', ')}</span>
  }

  const getProductosDisplay = (user) => {
    const activeProducts = user.productPermissions?.filter(pp => pp.roleId) || []
    if (activeProducts.length === 0) return <span className={styles.textMuted}>—</span>
    const productNames = activeProducts.map(pp => {
      const product = mockProducts.find(p => p.id === pp.productId)
      return product ? product.name : ''
    }).filter(Boolean)

    return (
      <div className={styles.productTags}>
        {productNames.map((name, i) => (
          <span key={i} className={styles.productTag}>{name}</span>
        ))}
      </div>
    )
  }

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    setSelectedUsers([])
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Listado de Usuarios</h1>
          <p className={styles.stats}>
            {activeCount} activos · {blockedCount} bloqueados · {users.length} total
          </p>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" size="sm">
            <Icon name="download" size={16} />
            Descargar
          </Button>
          <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
            <Icon name="plus" size={16} />
            Añadir Usuario
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <div className={styles.searchBox}>
            <Icon name="search" size={18} />
            <Input
              placeholder="Buscar por nombre o usuario..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
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
            options={FLOTAS_OPTIONS}
            value={flotasFilter}
            onChange={setFlotasFilter}
            placeholder="Flotas"
          />
        </div>

        <div className={styles.filterGroup}>
          <MultiSelect
            options={PRODUCTOS_OPTIONS}
            value={productosFilter}
            onChange={setProductosFilter}
            placeholder="Productos"
          />
        </div>

        <div className={styles.filterGroup}>
          <MultiSelect
            options={POOLS_OPTIONS}
            value={poolsFilter}
            onChange={setPoolsFilter}
            placeholder="Pools"
          />
        </div>

        <div className={styles.filterGroup}>
          <MultiSelect
            options={GRUPOS_OPTIONS}
            value={gruposFilter}
            onChange={setGruposFilter}
            placeholder="Grupos"
          />
        </div>

        {selectedUsers.length > 0 && (
          <div className={styles.bulkActions}>
            <span className={styles.selectedCount}>{selectedUsers.length} seleccionados</span>
            <Button variant="secondary" size="sm">
              <Icon name="lock" size={16} />
              Bloquear
            </Button>
            <Button variant="danger" size="sm">
              <Icon name="trash2" size={16} />
              Eliminar
            </Button>
          </div>
        )}
      </div>

      {/* Tabla */}
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pool</TableHead>
              <TableHead>Flotas</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead style={{ textAlign: 'right' }}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className={styles.emptyState}>
                    <Icon name="search" size={48} />
                    <p>No se encontraron usuarios</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                  />
                </TableCell>
                <TableCell className={styles.userNameCell}>{user.name}</TableCell>
                <TableCell className={styles.userUsernameCell}>@{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getPoolBadge(user.poolClient)}</TableCell>
                <TableCell>{getFlotasDisplay(user)}</TableCell>
                <TableCell>{getProductosDisplay(user)}</TableCell>
                <TableCell>{user.grupo}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  {user.lastAccess
                    ? new Date(user.lastAccess).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })
                    : 'Nunca'}
                </TableCell>
                <TableCell>
                  <div className={styles.rowActions}>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleBlockUser(user)}
                      title={user.status === 'activo' ? 'Bloquear' : 'Desbloquear'}
                    >
                      <Icon name={user.status === 'activo' ? 'lock' : 'unlock'} size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      title="Editar"
                    >
                      <Icon name="edit" size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleDeleteUser(user.id)}
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

      {/* Paginación */}
      <div className={styles.pagination}>
        <div className={styles.paginationLeft}>
          <span className={styles.paginationInfo}>
            Mostrando {filteredUsers.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredUsers.length)} de {filteredUsers.length} usuarios
          </span>
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
              setSelectedUsers([])
            }}
          >
            {PAGE_SIZE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.paginationButtons}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon name="chevronLeft" size={16} />
            Anterior
          </Button>
          <span className={styles.pageNumbers}>
            Página {currentPage} de {totalPages || 1}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Siguiente
            <Icon name="chevronRight" size={16} />
          </Button>
        </div>
      </div>

      {/* Dialog Añadir Usuario */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} size="md">
        <DialogHeader>
          <DialogTitle>Añadir Usuario</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p className={styles.dialogText}>Formulario para añadir un nuevo usuario...</p>
        </DialogContent>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary">
            Guardar
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
