/**
 * Configurações para filtros da aplicação
 * Define opções de filtro, ordenação e busca para transações
 */

// Tipos de transação disponíveis
export const TRANSACTION_TYPES = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'income', label: 'Receitas' },
  { value: 'expense', label: 'Despesas' }
] as const;

// Categorias de transação
export const TRANSACTION_CATEGORIES = [
  { value: 'all', label: 'Todas as categorias' },
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
  { value: 'lazer', label: 'Lazer' },
  { value: 'compras', label: 'Compras' },
  { value: 'receita', label: 'Receita' },
  { value: 'investimento', label: 'Investimento' },
  { value: 'outros', label: 'Outros' }
] as const;

// Opções de período
export const PERIOD_OPTIONS = [
  { value: 'all', label: 'Todo o período' },
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'Este mês' },
  { value: 'quarter', label: 'Este trimestre' },
  { value: 'year', label: 'Este ano' },
  { value: 'custom', label: 'Período personalizado' }
] as const;

// Opções de ordenação
export const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Data (mais recente)' },
  { value: 'date_asc', label: 'Data (mais antiga)' },
  { value: 'amount_desc', label: 'Valor (maior)' },
  { value: 'amount_asc', label: 'Valor (menor)' },
  { value: 'description_asc', label: 'Descrição (A-Z)' },
  { value: 'description_desc', label: 'Descrição (Z-A)' },
  { value: 'category_asc', label: 'Categoria (A-Z)' }
] as const;

// Opções de visualização
export const VIEW_OPTIONS = [
  { value: 'list', label: 'Lista', icon: 'List' },
  { value: 'grid', label: 'Grade', icon: 'Grid' },
  { value: 'table', label: 'Tabela', icon: 'Table' }
] as const;

// Opções de agrupamento
export const GROUP_OPTIONS = [
  { value: 'none', label: 'Sem agrupamento' },
  { value: 'date', label: 'Por data' },
  { value: 'category', label: 'Por categoria' },
  { value: 'type', label: 'Por tipo' },
  { value: 'month', label: 'Por mês' }
] as const;

// Configurações de paginação
export const PAGINATION_CONFIG = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) => 
    `${range[0]}-${range[1]} de ${total} transações`
} as const;

// Configurações de busca
export const SEARCH_CONFIG = {
  placeholder: 'Buscar por descrição, categoria ou valor...',
  debounceMs: 300,
  minLength: 2,
  caseSensitive: false,
  searchFields: ['description', 'category', 'amount'] as const
} as const;

// Filtros rápidos predefinidos
export const QUICK_FILTERS = [
  {
    id: 'recent',
    label: 'Recentes',
    description: 'Últimas 7 transações',
    filters: {
      limit: 7,
      sortBy: 'date_desc'
    }
  },
  {
    id: 'high_expenses',
    label: 'Gastos altos',
    description: 'Despesas acima de R$ 500',
    filters: {
      type: 'expense',
      minAmount: 500,
      sortBy: 'amount_desc'
    }
  },
  {
    id: 'this_month_income',
    label: 'Receitas do mês',
    description: 'Todas as receitas deste mês',
    filters: {
      type: 'income',
      period: 'month',
      sortBy: 'amount_desc'
    }
  },
  {
    id: 'food_expenses',
    label: 'Gastos com alimentação',
    description: 'Todas as despesas de alimentação',
    filters: {
      category: 'alimentacao',
      type: 'expense',
      sortBy: 'date_desc'
    }
  }
] as const;

// Configurações de exportação
export const EXPORT_CONFIG = {
  formats: [
    { value: 'csv', label: 'CSV', extension: '.csv' },
    { value: 'excel', label: 'Excel', extension: '.xlsx' },
    { value: 'pdf', label: 'PDF', extension: '.pdf' }
  ],
  defaultFilename: 'transacoes',
  includeFilters: true,
  includeSummary: true
} as const;

// Configurações de filtros avançados
export const ADVANCED_FILTERS_CONFIG = {
  amountRange: {
    min: 0,
    max: 10000,
    step: 10,
    marks: {
      0: 'R$ 0',
      2500: 'R$ 2.500',
      5000: 'R$ 5.000',
      7500: 'R$ 7.500',
      10000: 'R$ 10.000+'
    }
  },
  dateRange: {
    format: 'DD/MM/YYYY',
    separator: ' até ',
    placeholder: ['Data inicial', 'Data final']
  }
} as const;
