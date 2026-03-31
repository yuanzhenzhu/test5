// Configuración de productos del sistema

export const products = {
  '1': {
    id: '1',
    name: 'Fleet Management',
    shortName: 'FM',
    description: 'Sistema de gestión de flotas',
    icon: 'train',
    color: '#6c5ce7',
    hasFleets: true,
    roles: {
      basico: {
        id: 'fm-basico',
        name: 'Básico',
        permissions: {
          alarmasNivel1y2: true,
          todasLasAlarmas: false,
          compartirEventosNotificaciones: true,
        },
      },
      avanzado: {
        id: 'fm-avanzado',
        name: 'Avanzado',
        permissions: {
          alarmasNivel1y2: true,
          todasLasAlarmas: true,
          compartirEventosNotificaciones: true,
        },
      },
    },
  },
  '2': {
    id: '2',
    name: 'E&D',
    shortName: 'ED',
    description: 'Energía y Dinámica',
    icon: 'zap',
    color: '#00b894',
    hasFleets: false,
    roles: {
      basico: {
        id: 'ed-basico',
        name: 'Básico',
        permissions: {
          verDatos: true,
          exportarDatos: false,
          configurarParametros: false,
        },
      },
      avanzado: {
        id: 'ed-avanzado',
        name: 'Avanzado',
        permissions: {
          verDatos: true,
          exportarDatos: true,
          configurarParametros: true,
        },
      },
    },
  },
  '3': {
    id: '3',
    name: 'Wayside',
    shortName: 'WS',
    description: 'Monitoreo de vía',
    icon: 'layoutGrid',
    color: '#fdcb6e',
    hasFleets: true,
    roles: {
      basico: {
        id: 'ws-basico',
        name: 'Básico',
        permissions: {
          verMediciones: true,
          crearMediciones: false,
          exportarReportes: false,
        },
      },
      avanzado: {
        id: 'ws-avanzado',
        name: 'Avanzado',
        permissions: {
          verMediciones: true,
          crearMediciones: true,
          exportarReportes: true,
        },
      },
    },
  },
  '4': {
    id: '4',
    name: 'Advanced Analytics',
    shortName: 'AA',
    description: 'Análisis avanzado y reportes',
    icon: 'barChart',
    color: '#e17055',
    hasFleets: false,
    roles: {
      basico: {
        id: 'aa-basico',
        name: 'Básico',
        permissions: {
          verDashboards: true,
          crearDashboards: false,
          exportarReportes: false,
          configurarAlertas: false,
        },
      },
      avanzado: {
        id: 'aa-avanzado',
        name: 'Avanzado',
        permissions: {
          verDashboards: true,
          crearDashboards: true,
          exportarReportes: true,
          configurarAlertas: true,
        },
      },
    },
  },
};

// Obtener producto por ID
export const getProduct = (productId) => {
  return products[productId] || null;
};

// Obtener todos los productos como array
export const getAllProducts = () => {
  return Object.values(products);
};

// Obtener roles de un producto
export const getProductRoles = (productId) => {
  const product = getProduct(productId);
  return product?.roles || {};
};

// Obtener nombre de rol
export const getRoleName = (productId, roleId) => {
  const product = getProduct(productId);
  if (!product || !product.roles[roleId]) return 'Desconocido';
  return product.roles[roleId].name;
};

// Verificar si un producto tiene flotas
export const productHasFleets = (productId) => {
  const product = getProduct(productId);
  return product?.hasFleets || false;
};

// Obtener color de producto
export const getProductColor = (productId) => {
  const product = getProduct(productId);
  return product?.color || '#6c5ce7';
};

// Perfiles de usuario disponibles
export const userProfiles = [
  { value: 'Jefe', label: 'Jefe' },
  { value: 'Analista', label: 'Analista' },
  { value: 'Técnico', label: 'Técnico' },
];

// Grupos de usuario disponibles
export const userGroups = [
  { value: 'Gestión', label: 'Gestión' },
  { value: 'Operaciones', label: 'Operaciones' },
  { value: 'Mantenimiento', label: 'Mantenimiento' },
  { value: 'Supervisión', label: 'Supervisión' },
  { value: 'Análisis', label: 'Análisis' },
];

// Idiomas disponibles
export const languages = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'Inglés' },
  { value: 'de', label: 'Alemán' },
];

// Formatos de número disponibles
export const numberFormats = [
  { value: 'comma', label: '1.234,56 (coma)' },
  { value: 'dot', label: '1,234.56 (punto)' },
];
