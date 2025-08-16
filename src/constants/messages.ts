/**
 * Mensagens e textos da aplicação
 * Centraliza todas as mensagens, labels e textos utilizados na interface
 */

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  transaction: {
    created: 'Transação criada com sucesso!',
    updated: 'Transação atualizada com sucesso!',
    deleted: 'Transação excluída com sucesso!',
    imported: 'Transações importadas com sucesso!'
  },
  budget: {
    created: 'Orçamento criado com sucesso!',
    updated: 'Orçamento atualizado com sucesso!',
    deleted: 'Orçamento excluído com sucesso!'
  },
  goal: {
    created: 'Meta criada com sucesso!',
    updated: 'Meta atualizada com sucesso!',
    deleted: 'Meta excluída com sucesso!',
    achieved: 'Parabéns! Meta alcançada!'
  },
  export: {
    completed: 'Exportação concluída com sucesso!',
    downloaded: 'Arquivo baixado com sucesso!'
  },
  settings: {
    saved: 'Configurações salvas com sucesso!'
  }
} as const;

// Mensagens de erro
export const ERROR_MESSAGES = {
  general: {
    unexpected: 'Ocorreu um erro inesperado. Tente novamente.',
    network: 'Erro de conexão. Verifique sua internet.',
    timeout: 'Tempo limite excedido. Tente novamente.',
    notFound: 'Recurso não encontrado.',
    unauthorized: 'Acesso não autorizado.',
    forbidden: 'Operação não permitida.'
  },
  validation: {
    required: 'Este campo é obrigatório',
    minLength: (min: number) => `Mínimo de ${min} caracteres`,
    maxLength: (max: number) => `Máximo de ${max} caracteres`,
    minValue: (min: number) => `Valor mínimo: ${min}`,
    maxValue: (max: number) => `Valor máximo: ${max}`,
    invalidEmail: 'E-mail inválido',
    invalidDate: 'Data inválida',
    invalidAmount: 'Valor inválido',
    futureDate: 'Data não pode ser futura',
    pastDate: 'Data não pode ser passada'
  },
  transaction: {
    notFound: 'Transação não encontrada',
    invalidAmount: 'Valor da transação inválido',
    invalidDate: 'Data da transação inválida',
    duplicated: 'Transação duplicada detectada'
  },
  budget: {
    notFound: 'Orçamento não encontrado',
    exceeded: 'Orçamento excedido!',
    invalidPeriod: 'Período do orçamento inválido'
  },
  goal: {
    notFound: 'Meta não encontrada',
    invalidTarget: 'Valor da meta inválido',
    invalidDeadline: 'Prazo da meta inválido'
  },
  file: {
    invalidFormat: 'Formato de arquivo inválido',
    tooLarge: 'Arquivo muito grande',
    uploadFailed: 'Falha no upload do arquivo',
    corruptedFile: 'Arquivo corrompido'
  }
} as const;

// Mensagens de aviso
export const WARNING_MESSAGES = {
  budget: {
    nearLimit: (percentage: number) => `Atenção! ${percentage}% do orçamento utilizado`,
    exceeded: 'Orçamento excedido neste período!'
  },
  goal: {
    nearDeadline: 'Meta próxima do prazo!',
    behindSchedule: 'Meta atrasada em relação ao cronograma'
  },
  transaction: {
    highAmount: 'Valor alto detectado. Confirme se está correto.',
    duplicateWarning: 'Transação similar encontrada. Verificar duplicação?'
  },
  data: {
    unsavedChanges: 'Existem alterações não salvas. Deseja continuar?',
    dataLoss: 'Esta ação não pode ser desfeita.'
  }
} as const;

// Mensagens informativas
export const INFO_MESSAGES = {
  loading: {
    transactions: 'Carregando transações...',
    budgets: 'Carregando orçamentos...',
    goals: 'Carregando metas...',
    reports: 'Gerando relatório...',
    export: 'Preparando exportação...',
    import: 'Processando importação...'
  },
  empty: {
    transactions: 'Nenhuma transação encontrada',
    budgets: 'Nenhum orçamento criado',
    goals: 'Nenhuma meta definida',
    reports: 'Nenhum relatório disponível',
    search: 'Nenhum resultado encontrado'
  },
  tips: {
    firstTransaction: 'Adicione sua primeira transação para começar!',
    createBudget: 'Crie orçamentos para controlar seus gastos',
    setGoals: 'Defina metas para alcançar seus objetivos financeiros',
    exportData: 'Exporte seus dados para backup ou análise externa'
  }
} as const;

// Labels e textos da interface
export const UI_LABELS = {
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    view: 'Visualizar',
    add: 'Adicionar',
    remove: 'Remover',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    export: 'Exportar',
    import: 'Importar',
    print: 'Imprimir',
    share: 'Compartilhar',
    copy: 'Copiar',
    close: 'Fechar',
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    confirm: 'Confirmar',
    yes: 'Sim',
    no: 'Não',
    ok: 'OK',
    loading: 'Carregando...',
    noData: 'Sem dados',
    selectAll: 'Selecionar tudo',
    clearAll: 'Limpar tudo'
  },
  
  transaction: {
    title: 'Transação',
    titlePlural: 'Transações',
    description: 'Descrição',
    amount: 'Valor',
    category: 'Categoria',
    type: 'Tipo',
    date: 'Data',
    notes: 'Observações',
    income: 'Receita',
    expense: 'Despesa',
    newTransaction: 'Nova Transação',
    editTransaction: 'Editar Transação',
    deleteTransaction: 'Excluir Transação'
  },
  
  budget: {
    title: 'Orçamento',
    titlePlural: 'Orçamentos',
    name: 'Nome',
    amount: 'Valor',
    period: 'Período',
    categories: 'Categorias',
    spent: 'Gasto',
    remaining: 'Restante',
    progress: 'Progresso',
    newBudget: 'Novo Orçamento',
    editBudget: 'Editar Orçamento',
    deleteBudget: 'Excluir Orçamento'
  },
  
  goal: {
    title: 'Meta',
    titlePlural: 'Metas',
    name: 'Nome',
    targetAmount: 'Valor Alvo',
    currentAmount: 'Valor Atual',
    deadline: 'Prazo',
    progress: 'Progresso',
    achieved: 'Alcançada',
    pending: 'Pendente',
    newGoal: 'Nova Meta',
    editGoal: 'Editar Meta',
    deleteGoal: 'Excluir Meta'
  },
  
  report: {
    title: 'Relatório',
    titlePlural: 'Relatórios',
    period: 'Período',
    category: 'Categoria',
    summary: 'Resumo',
    details: 'Detalhes',
    chart: 'Gráfico',
    table: 'Tabela',
    generateReport: 'Gerar Relatório',
    downloadReport: 'Baixar Relatório'
  }
} as const;

// Textos de confirmação
export const CONFIRMATION_MESSAGES = {
  delete: {
    transaction: 'Tem certeza que deseja excluir esta transação?',
    budget: 'Tem certeza que deseja excluir este orçamento?',
    goal: 'Tem certeza que deseja excluir esta meta?',
    multiple: 'Tem certeza que deseja excluir os itens selecionados?'
  },
  
  action: {
    unsavedChanges: 'Existem alterações não salvas. Deseja sair mesmo assim?',
    resetFilters: 'Deseja limpar todos os filtros?',
    clearData: 'Esta ação irá limpar todos os dados. Continuar?',
    importData: 'Os dados existentes serão substituídos. Continuar?'
  }
} as const;

// Textos de ajuda e dicas
export const HELP_TEXTS = {
  transaction: {
    description: 'Descreva brevemente a transação (ex: Compra no supermercado)',
    amount: 'Digite o valor da transação em reais',
    category: 'Selecione a categoria que melhor representa esta transação',
    date: 'Data em que a transação foi realizada'
  },
  
  budget: {
    name: 'Nome para identificar este orçamento',
    amount: 'Valor limite para este orçamento',
    period: 'Período de vigência do orçamento',
    categories: 'Categorias incluídas neste orçamento'
  },
  
  goal: {
    name: 'Nome da sua meta financeira',
    targetAmount: 'Valor que deseja alcançar',
    deadline: 'Data limite para alcançar a meta',
    description: 'Descrição opcional da meta'
  }
} as const;

// Placeholders para campos de entrada
export const PLACEHOLDERS = {
  search: 'Digite para buscar...',
  description: 'Ex: Compra no supermercado',
  amount: '0,00',
  notes: 'Observações adicionais...',
  budgetName: 'Ex: Orçamento Mensal',
  goalName: 'Ex: Viagem de férias',
  email: 'seu@email.com',
  password: '••••••••'
} as const;
