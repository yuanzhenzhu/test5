// Formateo de fechas
export const formatDate = (date, locale = 'es-ES') => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date, locale = 'es-ES') => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Formateo de números
export const formatNumber = (num, decimals = 0, locale = 'es-ES') => {
  if (num === null || num === undefined) return '-';
  return num.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Formateo de último acceso
export const formatLastAccess = (date) => {
  if (!date) return 'Nunca';

  const now = new Date();
  const accessDate = new Date(date);
  const diffMs = now - accessDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Ahora mismo';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  if (diffDays < 7) return `Hace ${diffDays} días`;

  return formatDate(date);
};

// Determinar color de estado
export const getStatusColor = (status) => {
  return status === 'activo' ? 'success' : 'danger';
};

// Determinar texto de estado
export const getStatusText = (status) => {
  return status === 'activo' ? 'Activo' : 'Bloqueado';
};

// Obtener iniciales del nombre
export const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Validación de email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Truncar texto
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Ordenar array de objetos
export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Filtrar array de objetos
export const filterBy = (array, filters) => {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === null || value === undefined || value === '') return true;
      if (Array.isArray(value)) {
        return value.includes(item[key]);
      }
      return item[key] === value;
    });
  });
};

// Búsqueda en texto
export const searchIn = (array, searchTerm, keys) => {
  if (!searchTerm) return array;

  const term = searchTerm.toLowerCase();
  return array.filter(item => {
    return keys.some(key => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      return false;
    });
  });
};

// Generar ID único
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Agrupar array por clave
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

// Contar ocurrencias
export const countBy = (array, key) => {
  return array.reduce((result, item) => {
    const value = item[key];
    result[value] = (result[value] || 0) + 1;
    return result;
  }, {});
};

// Combinar clases CSS
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
