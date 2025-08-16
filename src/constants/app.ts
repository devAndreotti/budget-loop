/**
 * Constantes gerais da aplicação
 * Define informações básicas, configurações e metadados da aplicação
 */

// Informações da aplicação
export const APP_INFO = {
  name: 'Budget Loop',
  version: '1.0.0',
  description: 'Sistema de controle financeiro pessoal',
  author: 'Budget Loop Team',
  website: 'https://budgetloop.com',
  repository: 'https://github.com/username/budget-loop',
  license: 'MIT'
} as const;

// Configurações de ambiente
export const ENV_CONFIG = {
  development: {
    apiUrl: 'http://localhost:3001/api',
    enableDebug: true,
    enableMocks: true
  },
  production: {
    apiUrl: '/api',
    enableDebug: false,
    enableMocks: false
  },
  test: {
    apiUrl: 'http://localhost:3001/api',
    enableDebug: false,
    enableMocks: true
  }
} as const;

// Rotas da aplicação
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  transactions: {
    list: '/transactions',
    new: '/transactions/new',
    edit: (id: string) => `/transactions/${id}/edit`,
    view: (id: string) => `/transactions/${id}`
  },
  budgets: {
    list: '/budgets',
    new: '/budgets/new',
    edit: (id: string) => `/budgets/${id}/edit`,
    view: (id: string) => `/budgets/${id}`
  },
  goals: {
    list: '/goals',
    new: '/goals/new',
    edit: (id: string) => `/goals/${id}/edit`,
    view: (id: string) => `/goals/${id}`
  },
  reports: '/reports',
  settings: '/settings',
  profile: '/profile',
  help: '/help',
  about: '/about'
} as const;

// Configurações de API
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  endpoints: {
    transactions: '/transactions',
    budgets: '/budgets',
    goals: '/goals',
    categories: '/categories',
    reports: '/reports',
    export: '/export',
    import: '/import',
    auth: '/auth',
    user: '/user'
  }
} as const;

// Configurações de localStorage
export const STORAGE_KEYS = {
  transactions: 'budget-loop:transactions',
  budgets: 'budget-loop:budgets',
  goals: 'budget-loop:goals',
  settings: 'budget-loop:settings',
  theme: 'budget-loop:theme',
  filters: 'budget-loop:filters',
  user: 'budget-loop:user',
  cache: 'budget-loop:cache'
} as const;

// Configurações de data e hora
export const DATE_CONFIG = {
  defaultFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  locale: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  firstDayOfWeek: 1, // Segunda-feira
  weekendDays: [0, 6] // Domingo e Sábado
} as const;

// Configurações de moeda
export const CURRENCY_CONFIG = {
  code: 'BRL',
  symbol: 'R$',
  locale: 'pt-BR',
  precision: 2,
  format: {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
} as const;

// Configurações de navegação
export const NAVIGATION_CONFIG = {
  mainMenu: [
    {
      label: 'Dashboard',
      href: ROUTES.dashboard,
      icon: 'BarChart3',
      description: 'Visão geral das finanças'
    },
    {
      label: 'Transações',
      href: ROUTES.transactions.list,
      icon: 'Receipt',
      description: 'Gerenciar receitas e despesas'
    },
    {
      label: 'Orçamentos',
      href: ROUTES.budgets.list,
      icon: 'Target',
      description: 'Controlar gastos por categoria'
    },
    {
      label: 'Metas',
      href: ROUTES.goals.list,
      icon: 'TrendingUp',
      description: 'Objetivos financeiros'
    },
    {
      label: 'Relatórios',
      href: ROUTES.reports,
      icon: 'FileText',
      description: 'Análises e relatórios'
    }
  ],
  
  userMenu: [
    {
      label: 'Perfil',
      href: ROUTES.profile,
      icon: 'User'
    },
    {
      label: 'Configurações',
      href: ROUTES.settings,
      icon: 'Settings'
    },
    {
      label: 'Ajuda',
      href: ROUTES.help,
      icon: 'HelpCircle'
    },
    {
      label: 'Sobre',
      href: ROUTES.about,
      icon: 'Info'
    }
  ]
} as const;

// Configurações de notificação
export const NOTIFICATION_CONFIG = {
  position: 'top-right',
  duration: 5000,
  maxNotifications: 5,
  types: {
    success: {
      icon: 'CheckCircle',
      color: 'green'
    },
    error: {
      icon: 'XCircle',
      color: 'red'
    },
    warning: {
      icon: 'AlertTriangle',
      color: 'yellow'
    },
    info: {
      icon: 'Info',
      color: 'blue'
    }
  }
} as const;

// Configurações de tema
export const THEME_CONFIG = {
  defaultTheme: 'light',
  storageKey: STORAGE_KEYS.theme,
  themes: ['light', 'dark', 'system'],
  enableSystemTheme: true
} as const;

// Configurações de performance
export const PERFORMANCE_CONFIG = {
  enableVirtualization: true,
  virtualItemHeight: 60,
  loadingDebounce: 300,
  searchDebounce: 500,
  autoSaveDelay: 2000,
  cacheTimeout: 5 * 60 * 1000 // 5 minutos
} as const;

// Configurações de acessibilidade
export const ACCESSIBILITY_CONFIG = {
  enableKeyboardNavigation: true,
  enableScreenReader: true,
  enableHighContrast: false,
  enableReducedMotion: false,
  focusRingColor: '#3b82f6'
} as const;

// Configurações de desenvolvimento
export const DEV_CONFIG = {
  enableDevTools: process.env.NODE_ENV === 'development',
  enableMockData: process.env.NODE_ENV === 'development',
  enableDebugLogs: process.env.NODE_ENV === 'development',
  enablePerformanceMonitoring: true
} as const;
