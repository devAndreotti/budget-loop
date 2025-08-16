/**
 * Configurações de limites e validações da aplicação
 * Define limites para transações, orçamentos e outras funcionalidades
 */

// Limites para transações
export const TRANSACTION_LIMITS = {
  // Valores monetários
  amount: {
    min: 0.01,
    max: 1000000,
    precision: 2
  },
  
  // Descrição
  description: {
    minLength: 3,
    maxLength: 255,
    required: true
  },
  
  // Categoria
  category: {
    required: true,
    allowedValues: [
      'alimentacao',
      'transporte',
      'moradia',
      'saude',
      'educacao',
      'lazer',
      'compras',
      'receita',
      'investimento',
      'outros'
    ]
  },
  
  // Data
  date: {
    minDate: new Date('2020-01-01'),
    maxDate: new Date('2030-12-31'),
    required: true
  },
  
  // Observações
  notes: {
    maxLength: 1000,
    required: false
  }
} as const;

// Limites para orçamentos
export const BUDGET_LIMITS = {
  // Valor do orçamento
  amount: {
    min: 1,
    max: 1000000,
    precision: 2
  },
  
  // Nome do orçamento
  name: {
    minLength: 3,
    maxLength: 100,
    required: true
  },
  
  // Período
  period: {
    allowedValues: ['monthly', 'quarterly', 'yearly'],
    required: true
  },
  
  // Categorias incluídas
  categories: {
    minItems: 1,
    maxItems: 10,
    required: true
  }
} as const;

// Limites para metas financeiras
export const GOAL_LIMITS = {
  // Valor da meta
  targetAmount: {
    min: 1,
    max: 10000000,
    precision: 2
  },
  
  // Nome da meta
  name: {
    minLength: 3,
    maxLength: 100,
    required: true
  },
  
  // Data limite
  deadline: {
    minDate: new Date(),
    maxDate: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 anos
    required: true
  },
  
  // Descrição
  description: {
    maxLength: 500,
    required: false
  }
} as const;

// Limites para exportação de dados
export const EXPORT_LIMITS = {
  // Número máximo de registros por exportação
  maxRecords: 10000,
  
  // Tamanho máximo do arquivo (em MB)
  maxFileSize: 50,
  
  // Formatos permitidos
  allowedFormats: ['csv', 'excel', 'pdf'],
  
  // Período máximo para exportação
  maxDateRange: 365 // dias
} as const;

// Limites para upload de arquivos
export const UPLOAD_LIMITS = {
  // Tamanho máximo por arquivo (em MB)
  maxFileSize: 10,
  
  // Tipos de arquivo permitidos
  allowedTypes: [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  
  // Número máximo de arquivos por upload
  maxFiles: 1,
  
  // Número máximo de registros por importação
  maxRecords: 5000
} as const;

// Limites para busca e filtros
export const SEARCH_LIMITS = {
  // Comprimento mínimo da busca
  minSearchLength: 2,
  
  // Comprimento máximo da busca
  maxSearchLength: 100,
  
  // Número máximo de resultados
  maxResults: 1000,
  
  // Tempo limite para busca (em ms)
  searchTimeout: 5000
} as const;

// Limites para paginação
export const PAGINATION_LIMITS = {
  // Tamanho mínimo da página
  minPageSize: 5,
  
  // Tamanho máximo da página
  maxPageSize: 100,
  
  // Tamanho padrão da página
  defaultPageSize: 20,
  
  // Número máximo de páginas a exibir na navegação
  maxVisiblePages: 7
} as const;

// Limites para cache e performance
export const PERFORMANCE_LIMITS = {
  // Tempo de cache em localStorage (em ms)
  cacheTimeout: 24 * 60 * 60 * 1000, // 24 horas
  
  // Número máximo de itens no cache
  maxCacheItems: 1000,
  
  // Tempo limite para requisições (em ms)
  requestTimeout: 30000,
  
  // Número máximo de tentativas para requisições
  maxRetries: 3
} as const;

// Limites para validação de dados
export const VALIDATION_LIMITS = {
  // Número máximo de erros de validação a exibir
  maxValidationErrors: 10,
  
  // Tempo de debounce para validação (em ms)
  validationDebounce: 300,
  
  // Padrões de validação
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
  }
} as const;

// Limites para notificações
export const NOTIFICATION_LIMITS = {
  // Número máximo de notificações simultâneas
  maxNotifications: 5,
  
  // Tempo padrão de exibição (em ms)
  defaultDuration: 5000,
  
  // Tempo máximo de exibição (em ms)
  maxDuration: 30000,
  
  // Tipos de notificação permitidos
  allowedTypes: ['success', 'error', 'warning', 'info']
} as const;

// Limites para relatórios
export const REPORT_LIMITS = {
  // Período máximo para relatórios
  maxDateRange: 730, // 2 anos
  
  // Número máximo de categorias em relatórios
  maxCategories: 20,
  
  // Número máximo de gráficos por relatório
  maxCharts: 10,
  
  // Tamanho máximo do relatório em PDF (em MB)
  maxPdfSize: 25
} as const;
