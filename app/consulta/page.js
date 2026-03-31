'use client'

import { useState, useMemo } from 'react'
import { mockUsers, mockProducts, mockFleets, mockCustomRoles } from '../../lib/mockData'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Input } from '../../components/ui/Input/Input'
import { Select } from '../../components/ui/Select/Select'
import { MultiSelect } from '../../components/ui/MultiSelect/MultiSelect'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table/Table'

// Opciones de filtros
const PRODUCT_OPTIONS = mockProducts.map(p => ({ value: p.id, label: p.name }))
const FLEET_OPTIONS = mockFleets.map(f => ({ value: f.id, label: f.name }))

// Estructura de permisos: cada combinación producto×flota tiene su propio rol
// Formato: { "productId-fleetId": roleId }
const buildFleetRolesMap = (productPermissions) => {
  const map = {}
  productPermissions?.forEach(pp => {
    if (!pp.roleId) return
    const fleetIds = pp.fleetIds || []
    // Si no hay flotas específicas, aplica a todas las flotas del producto
    if (fleetIds.length === 0) {
      mockFleets.forEach(fleet => {
        map[`${pp.productId}-${fleet.id}`] = pp.roleId
      })
    } else {
      // Solo aplica a las flotas especificadas
      fleetIds.forEach(fleetId => {
        map[`${pp.productId}-${fleetId}`] = pp.roleId
      })
    }
  })
  return map
}

export default function ConsultaPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedFleets, setSelectedFleets] = useState([])

  // Aplicar filtros
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Filtro de búsqueda
      const matchesSearch = searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      // Si no hay filtros de productos/flotas, mostrar todos
      if (selectedProducts.length === 0 && selectedFleets.length === 0) {
        return true
      }

      // Filtro de productos: mostrar usuarios que tienen algún rol en los productos seleccionados
      const fleetRolesMap = buildFleetRolesMap(user.productPermissions)
      const userProducts = new Set(Object.keys(fleetRolesMap).map(key => key.split('-')[0]))

      const hasSelectedProduct = selectedProducts.length === 0 ||
        selectedProducts.some(prodId => userProducts.has(prodId))

      if (!hasSelectedProduct) return false

      // Filtro de flotas: mostrar usuarios que tienen algún rol en las flotas seleccionadas
      const userFleets = new Set(Object.keys(fleetRolesMap).map(key => key.split('-')[1]))

      const hasSelectedFleet = selectedFleets.length === 0 ||
        selectedFleets.some(fleetId => userFleets.has(fleetId))

      return hasSelectedFleet
    })
  }, [users, searchTerm, selectedProducts, selectedFleets])

  // Determinar qué columnas mostrar basado en filtros
  const productsToShow = selectedProducts.length === 0 ? mockProducts : mockProducts.filter(p => selectedProducts.includes(p.id))
  const fleetsToShow = selectedFleets.length === 0 ? mockFleets : mockFleets.filter(f => selectedFleets.includes(f.id))

  // Obtener roles disponibles para un producto
  const getRolesForProduct = (productId) => {
    const roles = mockCustomRoles
      .filter(r => r.productId === productId)
      .map(r => ({ value: r.id, label: r.name }))
    return [{ value: '', label: '—' }, ...roles]
  }

  // Obtener el rol actual de un usuario para un producto y flota específicos
  const getRoleForFleet = (user, productId, fleetId) => {
    const fleetRolesMap = buildFleetRolesMap(user.productPermissions)
    return fleetRolesMap[`${productId}-${fleetId}`] || ''
  }

  // Manejar el cambio de rol para una combinación producto×flota específica
  const handleRoleChange = (user, productId, fleetId, newRoleId) => {
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id !== user.id) return u

      // Reconstruir productPermissions con la nueva estructura
      // Primero, obtener todos los roles actuales en un mapa
      const fleetRolesMap = buildFleetRolesMap(u.productPermissions)

      // Actualizar el rol específico
      if (newRoleId === '') {
        delete fleetRolesMap[`${productId}-${fleetId}`]
      } else {
        fleetRolesMap[`${productId}-${fleetId}`] = newRoleId
      }

      // Reconstruir productPermissions agrupando por productId y roleId
      const newProductPermissions = []
      const grouped = {}

      Object.keys(fleetRolesMap).forEach(key => {
        const [prodId, fleetId] = key.split('-')
        const roleId = fleetRolesMap[key]

        if (!roleId) return

        const groupKey = `${prodId}-${roleId}`
        if (!grouped[groupKey]) {
          grouped[groupKey] = { productId: prodId, roleId: roleId, fleetIds: [] }
        }
        grouped[groupKey].fleetIds.push(fleetId)
      })

      Object.values(grouped).forEach(g => {
        newProductPermissions.push({
          productId: g.productId,
          roleId: g.roleId,
          fleetIds: g.fleetIds
        })
      })

      return {
        ...u,
        productPermissions: newProductPermissions
      }
    }))
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Consulta</h1>
          <p className={styles.description}>
            Vista de permisos: cada producto tiene sus 3 flotas con roles independientes
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchBox}>
          <Icon name="search" size={18} />
          <Input
            placeholder="Buscar por nombre o usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <MultiSelect
          options={PRODUCT_OPTIONS}
          value={selectedProducts}
          onChange={setSelectedProducts}
          placeholder="Productos"
        />
        <MultiSelect
          options={FLEET_OPTIONS}
          value={selectedFleets}
          onChange={setSelectedFleets}
          placeholder="Flotas"
        />
      </div>

      {/* Tabla */}
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            {/* Única fila: Usuario y cada combinación Producto-Flota */}
            <TableRow>
              <TableHead className={styles.stickyHeader}>Usuario</TableHead>
              {productsToShow.map(product => (
                fleetsToShow.map(fleet => (
                  <TableHead key={`${product.id}-${fleet.id}`} className={styles.fleetHeader}>
                    <div className={styles.headerContent}>
                      <span className={styles.fleetName}>{fleet.name}</span>
                      <span className={styles.productName}>{product.name}</span>
                    </div>
                  </TableHead>
                ))
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={1 + (productsToShow.length * fleetsToShow.length)} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className={styles.emptyState}>
                    <Icon name="search" size={48} />
                    <p>No se encontraron usuarios</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.map(user => (
              <TableRow key={user.id}>
                {/* Columna Usuario */}
                <TableCell className={styles.userCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                    </div>
                    <div className={styles.userDetails}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.userUsername}>@{user.username}</span>
                    </div>
                  </div>
                </TableCell>
                {/* Columnas de roles según filtros */}
                {productsToShow.map(product => (
                  fleetsToShow.map(fleet => {
                    const currentRoleId = getRoleForFleet(user, product.id, fleet.id)
                    const roleOptions = getRolesForProduct(product.id)

                    return (
                      <TableCell key={`${product.id}-${fleet.id}`} className={styles.roleCell}>
                        <Select
                          value={currentRoleId}
                          onChange={(newRoleId) => handleRoleChange(user, product.id, fleet.id, newRoleId)}
                          options={roleOptions}
                          placeholder="—"
                          className={styles.roleSelect}
                        />
                      </TableCell>
                    )
                  })
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Info Card */}
      <div className={styles.infoCard}>
        <Icon name="info" size={20} />
        <p>
          <strong>Estructura:</strong> 4 productos × 3 flotas = 12 columnas de roles.<br/>
          Cada celda permite asignar un rol diferente para esa combinación de producto y flota.
        </p>
      </div>
    </div>
  )
}
