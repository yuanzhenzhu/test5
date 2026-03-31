'use client'

import { useState, useMemo } from 'react'
import { mockUsers, mockCustomRoles, mockProducts, mockFleets, mockAssets, getUserAssets } from '../../lib/mockData'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Button } from '../../components/ui/Button/Button'
import { MultiSelect } from '../../components/ui/MultiSelect/MultiSelect'
import { Input } from '../../components/ui/Input/Input'
import { Select } from '../../components/ui/Select/Select'
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
  { value: 'Administración CAF', label: 'Administración CAF' },
  { value: 'Soporte CAF', label: 'Soporte CAF' },
  { value: 'Análisis CAF', label: 'Análisis CAF' }
]

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 por página' },
  { value: 20, label: '20 por página' },
  { value: 50, label: '50 por página' }
]

export default function UsuariosPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [estadosFilter, setEstadosFilter] = useState([])
  const [flotasFilter, setFlotasFilter] = useState([])
  const [productosFilter, setProductosFilter] = useState([])
  const [poolsFilter, setPoolsFilter] = useState([])
  const [gruposFilter, setGruposFilter] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [assetTransferTarget, setAssetTransferTarget] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Estado del formulario de creación (pasos)
  const [createStep, setCreateStep] = useState(1)
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    poolClient: 'Pool Cliente',
    grupo: 'Gestión',
    language: 'es',
    numberFormat: 'comma'
  })
  const [userProductPermissions, setUserProductPermissions] = useState({})

  // Aplicar filtros
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesEstado = estadosFilter.length === 0 || estadosFilter.includes(user.status)
      const matchesPool = poolsFilter.length === 0 || poolsFilter.includes(user.poolClient)
      const matchesGrupo = gruposFilter.length === 0 || gruposFilter.includes(user.grupo)

      return matchesSearch && matchesEstado && matchesPool && matchesGrupo
    })
  }, [users, searchTerm, estadosFilter, poolsFilter, gruposFilter])

  const totalPages = Math.ceil(filteredUsers.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  const activeCount = users.filter(u => u.status === 'activo').length
  const blockedCount = users.filter(u => u.status === 'bloqueado').length

  // Funciones para la creación de usuario
  const getRolesForProduct = (productId) => {
    const roles = mockCustomRoles
      .filter(r => r.productId === productId)
      .map(r => ({ value: r.id, label: r.name }))
    return [{ value: '', label: 'Sin rol' }, ...roles]
  }

  const resetCreateForm = () => {
    setCreateStep(1)
    setNewUser({
      name: '',
      username: '',
      email: '',
      poolClient: 'Pool Cliente',
      grupo: 'Gestión',
      language: 'es',
      numberFormat: 'comma'
    })
    setUserProductPermissions({})
  }

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

  const handleBlockUser = (userId) => {
    setUsers(users.map(u =>
      u.id === userId
        ? { ...u, status: u.status === 'activo' ? 'bloqueado' : 'activo' }
        : u
    ))
  }

  const openEditDialog = (user) => {
    setEditingUser(user)
    setNewUser({
      name: user.name,
      username: user.username,
      email: user.email,
      poolClient: user.poolClient,
      grupo: user.grupo,
      language: user.language || 'es',
      numberFormat: user.numberFormat || 'comma'
    })
    // Construir userProductPermissions desde productPermissions
    const perms = {}
    user.productPermissions?.forEach(pp => {
      perms[pp.productId] = {
        roleId: pp.roleId || '',
        fleetIds: pp.fleetIds || []
      }
    })
    setUserProductPermissions(perms)
    setCreateStep(1)
    setEditDialogOpen(true)
  }

  const handleEditUser = () => {
    const productPermissions = Object.entries(userProductPermissions).map(([productId, data]) => ({
      productId,
      roleId: data.roleId || null,
      fleetIds: data.fleetIds || []
    }))

    setUsers(users.map(u => {
      if (u.id === editingUser.id) {
        return {
          ...u,
          ...newUser,
          productPermissions,
          updatedAt: new Date()
        }
      }
      return u
    }))

    resetCreateForm()
    setEditDialogOpen(false)
    setEditingUser(null)
  }

  const handleCreateUser = () => {
    const productPermissions = Object.entries(userProductPermissions).map(([productId, data]) => ({
      productId,
      roleId: data.roleId || null,
      fleetIds: data.fleetIds || []
    })).filter(pp => pp.roleId)

    const user = {
      id: `user-${Date.now()}`,
      ...newUser,
      status: 'activo',
      productPermissions,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastAccess: null
    }

    setUsers([...users, user])
    setCreateDialogOpen(false)
    resetCreateForm()
  }

  // Funciones para eliminar usuario con traspaso de assets
  const openDeleteDialog = (userId) => {
    const userAssets = getUserAssets(userId)
    setUserToDelete({ id: userId, assets: userAssets })
    setAssetTransferTarget('')
    setDeleteDialogOpen(true)
  }

  const handleDeleteUser = () => {
    // Traspasar assets si es necesario
    if (assetTransferTarget && userToDelete?.assets?.length > 0) {
      setUsers(users.map(u => {
        if (u.id === assetTransferTarget) {
          // Aquí se agregarían los assets traspasados
          return u
        }
        return u
      }))
    }

    // Eliminar usuario
    setUsers(users.filter(u => u.id !== userToDelete.id))
    setDeleteDialogOpen(false)
    setUserToDelete(null)
    setAssetTransferTarget('')
  }

  // Helpers de UI
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

  // Actualizar el diálogo de edición para usar el mismo stepper
  const isEditing = editDialogOpen && editingUser !== null

  const otherUsersForTransfer = users.filter(u => u.id !== userToDelete?.id)

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
          <Button variant="primary" size="sm" onClick={() => setCreateDialogOpen(true)}>
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
            <Button variant="secondary" size="sm" onClick={() => {
              selectedUsers.forEach(userId => handleBlockUser(userId))
              setSelectedUsers([])
            }}>
              <Icon name="lock" size={16} />
              Bloquear
            </Button>
            <Button variant="secondary" size="sm" onClick={() => {
              selectedUsers.forEach(userId => {
                const user = users.find(u => u.id === userId)
                if (user?.status === 'bloqueado') {
                  handleBlockUser(userId)
                }
              })
              setSelectedUsers([])
            }}>
              <Icon name="unlock" size={16} />
              Desbloquear
            </Button>
            <Button variant="danger" size="sm" onClick={() => {
              // Eliminar usuarios seleccionados (sin traspaso de assets por ahora)
              setUsers(users.filter(u => !selectedUsers.includes(u.id)))
              setSelectedUsers([])
            }}>
              <Icon name="trash2" size={16} />
              Eliminar ({selectedUsers.length})
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
                      onClick={() => handleBlockUser(user.id)}
                      title={user.status === 'activo' ? 'Bloquear' : 'Desbloquear'}
                    >
                      <Icon name={user.status === 'activo' ? 'lock' : 'unlock'} size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      title="Editar"
                      onClick={() => openEditDialog(user)}
                    >
                      <Icon name="edit" size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      title="Eliminar"
                      onClick={() => openDeleteDialog(user.id)}
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
            }}
          >
            {PAGE_SIZE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.paginationButtons}>
          <Button variant="secondary" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <Icon name="chevronLeft" size={16} />
            Anterior
          </Button>
          <span className={styles.pageNumbers}>Página {currentPage} de {totalPages || 1}</span>
          <Button variant="secondary" size="sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}>
            Siguiente
            <Icon name="chevronRight" size={16} />
          </Button>
        </div>
      </div>

      {/* ========== DIALOGO CREAR/EDITAR USUARIO (MULTI-PASO) ========== */}
      <Dialog
        open={createDialogOpen || editDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false)
          setEditDialogOpen(false)
          resetCreateForm()
          setEditingUser(null)
        }}
        size="lg"
      >
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Usuario' : 'Añadir Usuario'}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          {/* Stepper */}
          <div className={styles.stepper}>
            <div className={`${styles.step} ${createStep >= 1 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>1</div>
              <span>Datos básicos</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={`${styles.step} ${createStep >= 2 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>2</div>
              <span>Organización</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={`${styles.step} ${createStep >= 3 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>3</div>
              <span>Permisos</span>
            </div>
          </div>

          {/* PASO 1: Datos básicos */}
          {createStep === 1 && (
            <div className={styles.formStep}>
              <h3>Datos básicos del usuario</h3>
              <div className={styles.formGroup}>
                <label>Nombre completo *</label>
                <Input
                  placeholder="Ej: Juan Pérez García"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Usuario *</label>
                <Input
                  placeholder="Ej: jperez"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email *</label>
                <Input
                  type="email"
                  placeholder="Ej: juan.perez@actren.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* PASO 2: Organización */}
          {createStep === 2 && (
            <div className={styles.formStep}>
              <h3>Configuración de organización</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Pool *</label>
                  <Select
                    value={newUser.poolClient}
                    onChange={(value) => setNewUser({ ...newUser, poolClient: value })}
                    options={POOLS_OPTIONS}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Grupo *</label>
                  <Select
                    value={newUser.grupo}
                    onChange={(value) => setNewUser({ ...newUser, grupo: value })}
                    options={GRUPOS_OPTIONS}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Idioma</label>
                  <Select
                    value={newUser.language}
                    onChange={(value) => setNewUser({ ...newUser, language: value })}
                    options={[
                      { value: 'es', label: 'Español' },
                      { value: 'en', label: 'English' },
                      { value: 'de', label: 'Deutsch' }
                    ]}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Formato numérico</label>
                  <Select
                    value={newUser.numberFormat}
                    onChange={(value) => setNewUser({ ...newUser, numberFormat: value })}
                    options={[
                      { value: 'comma', label: '1.234,56' },
                      { value: 'dot', label: '1,234.56' }
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASO 3: Permisos */}
          {createStep === 3 && (
            <div className={styles.formStep}>
              <h3>Permisos por producto</h3>
              <div className={styles.permissionsList}>
                {mockProducts.map(product => {
                  const perm = userProductPermissions[product.id] || { roleId: '', fleetIds: [] }
                  return (
                    <div key={product.id} className={styles.permissionItem}>
                      <div className={styles.permissionHeader}>
                        <Icon name={product.id === '1' ? 'truck' : product.id === '2' ? 'zap' : product.id === '3' ? 'activity' : 'barChart'} size={20} />
                        <span className={styles.permissionProduct}>{product.name}</span>
                      </div>
                      <div className={styles.permissionControls}>
                        <div className={styles.formGroup}>
                          <label>Rol</label>
                          <Select
                            value={perm.roleId}
                            onChange={(value) => setUserProductPermissions({
                              ...userProductPermissions,
                              [product.id]: { ...perm, roleId: value }
                            })}
                            options={getRolesForProduct(product.id)}
                          />
                        </div>
                        {perm.roleId && (
                          <div className={styles.formGroup}>
                            <label>Flotas</label>
                            <MultiSelect
                              options={FLOTAS_OPTIONS}
                              value={perm.fleetIds}
                              onChange={(values) => setUserProductPermissions({
                                ...userProductPermissions,
                                [product.id]: { ...perm, fleetIds: values }
                              })}
                              placeholder="Todas las flotas"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              setCreateDialogOpen(false)
              setEditDialogOpen(false)
              resetCreateForm()
              setEditingUser(null)
            }}
          >
            Cancelar
          </Button>
          {createStep > 1 && (
            <Button variant="secondary" onClick={() => setCreateStep(createStep - 1)}>
              Anterior
            </Button>
          )}
          {createStep < 3 ? (
            <Button variant="primary" onClick={() => setCreateStep(createStep + 1)} disabled={createStep === 1 && (!newUser.name || !newUser.username || !newUser.email)}>
              Siguiente
            </Button>
          ) : (
            <Button variant="primary" onClick={isEditing ? handleEditUser : handleCreateUser}>
              {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
          )}
        </DialogFooter>
      </Dialog>

      {/* ========== DIALOGO TRASPASO DE ASSETS ========== */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} size="md">
        <DialogHeader>
          <DialogTitle>Eliminar Usuario - Traspaso de Assets</DialogTitle>
        </DialogHeader>
        <DialogContent>
          {userToDelete?.assets?.length > 0 ? (
            <>
              <div className={styles.warningBox}>
                <Icon name="alertTriangle" size={24} className={styles.warningIcon} />
                <div>
                  <p className={styles.warningTitle}>Este usuario tiene {userToDelete.assets.length} assets asociados</p>
                  <p className={styles.warningText}>Debes asignar un destinatario para el traspaso de assets antes de eliminar el usuario.</p>
                </div>
              </div>

              <div className={styles.assetsList}>
                <h4>Assets a traspasar:</h4>
                <ul>
                  {userToDelete.assets.slice(0, 5).map(asset => (
                    <li key={asset.id}>
                      <span className={styles.assetType}>{asset.type}</span>
                      <span>{asset.name}</span>
                    </li>
                  ))}
                  {userToDelete.assets.length > 5 && (
                    <li className={styles.assetsMore}>...y {userToDelete.assets.length - 5} más</li>
                  )}
                </ul>
              </div>

              <div className={styles.formGroup}>
                <label>Usuario destinatario *</label>
                <Select
                  value={assetTransferTarget}
                  onChange={setAssetTransferTarget}
                  placeholder="Selecciona un usuario..."
                  options={otherUsersForTransfer.map(u => ({ value: u.id, label: `${u.name} (@${u.username})` }))}
                />
              </div>
            </>
          ) : (
            <div className={styles.confirmBox}>
              <Icon name="trash2" size={32} className={styles.confirmIcon} />
              <p>¿Estás seguro de que deseas eliminar este usuario?</p>
              <p className={styles.confirmText}>Esta acción no se puede deshacer.</p>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteUser}
            disabled={userToDelete?.assets?.length > 0 && !assetTransferTarget}
          >
            Eliminar Usuario
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
