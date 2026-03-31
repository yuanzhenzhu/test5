'use client'

import { useState } from 'react'
import { mockUsers } from '../../lib/mockData'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Button } from '../../components/ui/Button/Button'
import { Input } from '../../components/ui/Input/Input'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card/Card'
import { Badge } from '../../components/ui/Badge/Badge'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '../../components/ui/Dialog/Dialog'

// Grupos personalizados iniciales
const initialCustomGroups = [
  {
    id: 'group-1',
    name: 'Equipo de Gestión',
    description: 'Usuarios del equipo de gestión y dirección',
    userIds: ['user-1', 'user-5', 'user-9']
  },
  {
    id: 'group-2',
    name: 'Técnicos Flota 1',
    description: 'Personal asignado a la Flota 1',
    userIds: ['user-1', 'user-2', 'user-6', 'user-11']
  },
  {
    id: 'group-3',
    name: 'Analistas Data',
    description: 'Usuarios con acceso a Analytics',
    userIds: ['user-5', 'user-7', 'user-9', 'user-12', 'user-15']
  }
]

export default function GruposPage() {
  const [groups, setGroups] = useState(initialCustomGroups)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [expandedGroup, setExpandedGroup] = useState(null)
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])

  const handleCreateGroup = () => {
    if (!groupName.trim()) return

    const newGroup = {
      id: `group-${Date.now()}`,
      name: groupName.trim(),
      description: groupDescription.trim(),
      userIds: selectedUsers
    }

    setGroups([...groups, newGroup])
    resetForm()
    setDialogOpen(false)
  }

  const handleEditGroup = () => {
    if (!groupName.trim()) return

    setGroups(groups.map(g =>
      g.id === editingGroup.id
        ? { ...g, name: groupName.trim(), description: groupDescription.trim(), userIds: selectedUsers }
        : g
    ))

    resetForm()
    setDialogOpen(false)
    setEditingGroup(null)
  }

  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter(g => g.id !== groupId))
    if (expandedGroup === groupId) {
      setExpandedGroup(null)
    }
  }

  const openCreateDialog = () => {
    resetForm()
    setEditingGroup(null)
    setDialogOpen(true)
  }

  const openEditDialog = (group) => {
    setEditingGroup(group)
    setGroupName(group.name)
    setGroupDescription(group.description)
    setSelectedUsers(group.userIds)
    setDialogOpen(true)
  }

  const resetForm = () => {
    setGroupName('')
    setGroupDescription('')
    setSelectedUsers([])
  }

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const toggleExpandGroup = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId)
  }

  const getUserById = (userId) => {
    return mockUsers.find(u => u.id === userId)
  }

  const isUserSelected = (userId) => {
    return selectedUsers.includes(userId)
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Grupos</h1>
          <p className={styles.description}>
            Crea agrupaciones personalizadas de usuarios. Los grupos pueden solaparse.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateDialog}>
          <Icon name="plus" size={16} />
          Nuevo Grupo
        </Button>
      </div>

      {/* Info Card */}
      <Card className={styles.infoCard}>
        <CardContent className={styles.infoContent}>
          <Icon name="info" size={20} />
          <p>
            Los grupos personalizados te permiten organizar usuarios en conjuntos con nombres significativos.
            Un usuario puede pertenecer a varios grupos simultáneamente.
          </p>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className={styles.groupsGrid}>
        {groups.map(group => {
          const userCount = group.userIds.length
          const isExpanded = expandedGroup === group.id

          return (
            <Card key={group.id} className={styles.groupCard}>
              <CardHeader className={styles.groupHeader}>
                <div className={styles.groupInfo}>
                  <div className={styles.groupIcon}>
                    <Icon name="users" size={20} />
                  </div>
                  <div className={styles.groupDetails}>
                    <CardTitle>{group.name}</CardTitle>
                    <p className={styles.groupDescription}>{group.description}</p>
                  </div>
                </div>
                <Badge variant="primary">{userCount} usuarios</Badge>
              </CardHeader>
              <CardContent>
                <div className={styles.groupUsers}>
                  {group.userIds.slice(0, isExpanded ? undefined : 3).map(userId => {
                    const user = getUserById(userId)
                    if (!user) return null
                    return (
                      <div key={userId} className={styles.userChip}>
                        <span className={styles.userAvatar}>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                        </span>
                        <span className={styles.userName}>{user.name}</span>
                      </div>
                    )
                  })}
                  {!isExpanded && userCount > 3 && (
                    <div className={styles.userChipMore}>
                      +{userCount - 3} más
                    </div>
                  )}
                </div>
                <div className={styles.groupActions}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={styles.expandButton}
                    onClick={() => toggleExpandGroup(group.id)}
                  >
                    <Icon name={isExpanded ? "chevronUp" : "chevronDown"} size={14} />
                    {isExpanded ? 'Ver menos' : 'Ver todos'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(group)}>
                    <Icon name="edit" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    <Icon name="trash2" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Create New Group Card */}
        <Card className={styles.createCard} onClick={openCreateDialog}>
          <CardContent className={styles.createContent}>
            <div className={styles.createIcon}>
              <Icon name="plus" size={32} />
            </div>
            <span className={styles.createText}>Crear nuevo grupo</span>
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      {dialogOpen && (
        <div className={styles.dialogOverlay} onClick={() => setDialogOpen(false)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dialogHeader}>
              <h2>{editingGroup ? 'Editar Grupo' : 'Nuevo Grupo'}</h2>
              <button className={styles.closeButton} onClick={() => setDialogOpen(false)}>
                <Icon name="x" size={20} />
              </button>
            </div>
            <div className={styles.dialogContent}>
              <div className={styles.formGroup}>
                <label>Nombre del grupo *</label>
                <Input
                  placeholder="Ej: Equipo de Gestión"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Descripción</label>
                <Input
                  placeholder="Describe el propósito de este grupo..."
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Seleccionar usuarios ({selectedUsers.length} seleccionados)</label>
                <div className={styles.usersList}>
                  {mockUsers.map(user => {
                    const isSelected = isUserSelected(user.id)
                    return (
                      <label
                        key={user.id}
                        className={`${styles.userCheckbox} ${isSelected ? styles.selected : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleUserSelection(user.id)}
                        />
                        <span className={styles.userCheckboxAvatar}>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                        </span>
                        <div className={styles.userCheckboxInfo}>
                          <span className={styles.userCheckboxName}>{user.name}</span>
                          <span className={styles.userCheckboxEmail}>{user.email}</span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={styles.dialogFooter}>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={editingGroup ? handleEditGroup : handleCreateGroup}
                disabled={!groupName.trim()}
              >
                {editingGroup ? 'Guardar Cambios' : 'Crear Grupo'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
