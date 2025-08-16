/**
 * Configurações para os gráficos da aplicação
 * Define cores, estilos e configurações padrão para os componentes de visualização
 */

// Cores para categorias de transações
export const CATEGORY_COLORS = {
  alimentacao: '#FF6B6B',
  transporte: '#4ECDC4',
  moradia: '#45B7D1',
  saude: '#96CEB4',
  educacao: '#FFEAA7',
  lazer: '#DDA0DD',
  compras: '#98D8C8',
  outros: '#F7DC6F',
  receita: '#82E0AA',
  investimento: '#85C1E9'
} as const;

// Configurações padrão para gráficos de pizza
export const PIE_CHART_CONFIG = {
  innerRadius: 60,
  outerRadius: 120,
  paddingAngle: 2,
  dataKey: 'value',
  nameKey: 'name',
  animationBegin: 0,
  animationDuration: 800
} as const;

// Configurações padrão para gráficos de linha
export const LINE_CHART_CONFIG = {
  strokeWidth: 3,
  dot: {
    r: 6,
    strokeWidth: 2
  },
  activeDot: {
    r: 8,
    strokeWidth: 2
  },
  animationDuration: 1000
} as const;

// Configurações padrão para gráficos de barra
export const BAR_CHART_CONFIG = {
  barSize: 40,
  radius: [4, 4, 0, 0],
  animationDuration: 800
} as const;

// Configurações do grid para gráficos
export const CHART_GRID_CONFIG = {
  strokeDasharray: '3 3',
  stroke: '#e0e0e0',
  horizontal: true,
  vertical: false
} as const;

// Configurações de tooltip
export const TOOLTIP_CONFIG = {
  contentStyle: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  labelStyle: {
    color: '#374151',
    fontWeight: 'bold'
  },
  itemStyle: {
    color: '#6B7280'
  }
} as const;

// Configurações de legenda
export const LEGEND_CONFIG = {
  verticalAlign: 'bottom' as const,
  height: 36,
  iconType: 'circle' as const,
  wrapperStyle: {
    paddingTop: '20px'
  }
} as const;

// Configurações responsivas
export const RESPONSIVE_CONFIG = {
  mobile: {
    width: '100%',
    height: 250
  },
  tablet: {
    width: '100%',
    height: 300
  },
  desktop: {
    width: '100%',
    height: 350
  }
} as const;

// Formatadores de dados
export const CHART_FORMATTERS = {
  currency: (value: number) => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value),
  
  percentage: (value: number) => `${value.toFixed(1)}%`,
  
  date: (value: string) => 
    new Date(value).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric'
    })
} as const;

// Configurações de animação
export const ANIMATION_CONFIG = {
  duration: 800,
  easing: 'ease-out',
  delay: 0
} as const;
