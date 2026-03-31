'use client'

import { useState } from 'react'
import { mockClient } from '../../lib/mockData'
import styles from './page.module.css'
import { Icon } from '../../components/ui/Icon/Icon'
import { Button } from '../../components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card/Card'
import { Badge } from '../../components/ui/Badge/Badge'

export default function PlantillasPage() {
  const [uploadMode, setUploadMode] = useState(null) // 'add' | 'modify'

  const currentUsers = 10
  const limit = mockClient.userLimit
  const remaining = limit - currentUsers
  const percentage = (currentUsers / limit) * 100

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Plantillas de Importación</h1>
          <p className={styles.description}>
            Importa usuarios masivamente desde archivos CSV o Excel
          </p>
        </div>
      </div>

      {/* License Warning */}
      {percentage >= 90 && (
        <Card className={styles.warningCard}>
          <CardContent className={styles.warningContent}>
            <Icon name="alertTriangle" size={24} />
            <div>
              <h4>Límite de licencia cercano</h4>
              <p>
                Has usado {currentUsers} de {limit} usuarios disponibles.
                Quedan {remaining} licencias.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Options */}
      <div className={styles.uploadSection}>
        <h2 className={styles.sectionTitle}>Selecciona una acción</h2>
        <div className={styles.uploadOptions}>
          <Card className={styles.uploadCard} onClick={() => setUploadMode('add')}>
            <CardContent className={styles.uploadCardContent}>
              <div className={styles.uploadIcon}>
                <Icon name="userPlus" size={32} />
              </div>
              <h3>Añadir Usuarios</h3>
              <p>Importar nuevos usuarios al sistema desde una plantilla</p>
              <Button variant="primary" className={styles.uploadButton}>
                <Icon name="upload" size={16} />
                Subir Archivo
              </Button>
            </CardContent>
          </Card>

          <Card className={styles.uploadCard} onClick={() => setUploadMode('modify')}>
            <CardContent className={styles.uploadCardContent}>
              <div className={styles.uploadIcon}>
                <Icon name="refreshCw" size={32} />
              </div>
              <h3>Modificar Usuarios</h3>
              <p>Actualizar datos de usuarios existentes desde una plantilla</p>
              <Button variant="primary" className={styles.uploadButton}>
                <Icon name="upload" size={16} />
                Subir Archivo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Templates Section */}
      <div className={styles.templatesSection}>
        <h2 className={styles.sectionTitle}>Plantillas Disponibles</h2>
        <div className={styles.templatesList}>
          <Card className={styles.templateCard}>
            <CardContent className={styles.templateContent}>
              <div className={styles.templateHeader}>
                <Icon name="fileSpreadsheet" size={24} />
                <div>
                  <h4>Plantilla de Usuarios</h4>
                  <p>Formato CSV con columnas: nombre, email, perfil, grupo</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Icon name="download" size={16} />
                Descargar
              </Button>
            </CardContent>
          </Card>

          <Card className={styles.templateCard}>
            <CardContent className={styles.templateContent}>
              <div className={styles.templateHeader}>
                <Icon name="copy" size={24} />
                <div>
                  <h4>Plantilla de Modificación</h4>
                  <p>Formato CSV para actualizar usuarios existentes</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Icon name="download" size={16} />
                Descargar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Instructions */}
      <Card className={styles.instructionsCard}>
        <CardHeader>
          <CardTitle>Instrucciones</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className={styles.instructionsList}>
            <li>
              <strong>Descarga</strong> la plantilla de usuarios o crea tu propio archivo CSV
            </li>
            <li>
              <strong>Completa</strong> el archivo con los datos de los usuarios (nombre, email, perfil, grupo)
            </li>
            <li>
              <strong>Sube</strong> el archivo usando el botón "Subir Archivo"
            </li>
            <li>
              <strong>Revisa</strong> el resumen de importación antes de confirmar
            </li>
            <li>
              <strong>Confirma</strong> la importación para crear los usuarios
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
