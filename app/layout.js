import './globals.css'
import { TopNavbar } from '../components/layout/TopNavbar/TopNavbar'
import { LeftSidebar } from '../components/layout/LeftSidebar/LeftSidebar'

export const metadata = {
  title: 'User Manager',
  description: 'Sistema de gestión de usuarios',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* HEADER */}
          <TopNavbar />

          {/* CONTENEDOR PRINCIPAL */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* SIDEBAR */}
            <LeftSidebar />

            {/* CONTENIDO PRINCIPAL */}
            <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f5f6f8' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
