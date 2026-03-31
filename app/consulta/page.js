'use client'

import { useState, useMemo } from 'react'
import { mockUsers, mockProducts, mockFleets, mockCustomRoles } from '../../lib/mockData'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Input } from '../../components/ui/Input/Input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table/Table'

export default function ConsultaPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Aplicar filtros
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [searchTerm])

  const getRoleName = (productId, roleId) => {
    if (!roleId) return null
    const role = mockCustomRoles.find(r => r.id === roleId)
    return role ? role.name : roleId
  }

  const getRoleForFleet = (user, productId, fleetId) => {
    const productPermission = user.productPermissions?.find(pp => pp.productId === productId)
    if (!productPermission || !productPermission.roleId) return null

    // Si no tiene flotas específicas, tiene acceso a todas
    const fleetIds = productPermission.fleetIds || []
    if (fleetIds.length === 0 || fleetIds.includes(fleetId)) {
      return getRoleName(productId, productPermission.roleId)
    }
    return null
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Consulta</h1>
          <p className={styles.description}>
            Vista detallada de permisos por producto y flota
          </p>
        </div>
      </div>

      {/* Filtro */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <Icon name="search" size={18} />
          <Input
            placeholder="Buscar por nombre o usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.stickyHeader} rowSpan={2}>Usuario</TableHead>
              {mockProducts.map(product => (
                <TableHead key={product.id} className={styles.productHeader} colSpan={mockFleets.length}>
                  <div className={styles.productHeaderContent}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productCode}>{product.code}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
            <TableRow className={styles.fleetHeaderRow}>
              {mockProducts.map(product => (
                mockFleets.map(fleet => (
                  <TableHead key={`${product.id}-${fleet.id}`} className={styles.fleetHeader}>
                    {fleet.name}
                  </TableHead>
                ))
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={1 + (mockProducts.length * mockFleets.length)} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className={styles.emptyState}>
                    <Icon name="search" size={48} />
                    <p>No se encontraron usuarios</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell className={styles.userCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                    </div>
                    <div className={styles.userDetails}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.userUsername}>@{user.username}</span>
                      <span className={styles.userPool}>{user.poolClient}</span>
                    </div>
                  </div>
                </TableCell>
                {mockProducts.map(product => (
                  mockFleets.map(fleet => {
                    const role = getRoleForFleet(user, product.id, fleet.id)

                    return (
                      <TableCell key={`${product.id}-${fleet.id}`} className={styles.roleCell}>
                        {role ? (
                          <span className={styles.roleBadge}>{role}</span>
                        ) : (
                          <span className={styles.noRole}>—</span>
                        )}
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
          Esta tabla muestra los permisos de cada usuario desglosados por producto y flota.
          Cada columna representa el rol asignado para un producto específico en una flota determinada.
        </p>
      </div>
    </div>
  )
}
