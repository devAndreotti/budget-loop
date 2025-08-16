/**
 * Tipos específicos para comunicação com a API
 * Define interfaces para requisições, respostas e endpoints
 */

import { Transaction, Budget, Goal, TransactionFilters } from './index';

// Tipos base para requisições
export interface BaseRequest {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export interface PaginatedRequest extends BaseRequest {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Tipos para requisições de transações
export interface CreateTransactionRequest {
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string; // ISO date string
  notes?: string;
  tags?: string[];
}

export interface UpdateTransactionRequest extends Partial<CreateTransactionRequest> {
  id: string;
}

export interface GetTransactionsRequest extends PaginatedRequest {
  filters?: TransactionFilters;
  search?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: 'income' | 'expense' | 'all';
}

export interface DeleteTransactionRequest {
  id: string;
}

export interface BulkDeleteTransactionsRequest {
  ids: string[];
}

// Tipos para requisições de orçamentos
export interface CreateBudgetRequest {
  name: string;
  amount: number;
  period: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  categories: string[];
  startDate: string;
  endDate: string;
}

export interface UpdateBudgetRequest extends Partial<CreateBudgetRequest> {
  id: string;
}

export interface GetBudgetsRequest extends PaginatedRequest {
  active?: boolean;
  period?: string;
  category?: string;
}

// Tipos para requisições de metas
export interface CreateGoalRequest {
  name: string;
  description?: string;
  targetAmount: number;
  deadline: string;
  category?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface UpdateGoalRequest extends Partial<CreateGoalRequest> {
  id: string;
  currentAmount?: number;
  status?: 'active' | 'paused' | 'completed' | 'cancelled';
}

export interface GetGoalsRequest extends PaginatedRequest {
  status?: string;
  priority?: string;
  category?: string;
}

// Tipos para requisições de relatórios
export interface GenerateReportRequest {
  type: 'summary' | 'detailed' | 'category-analysis' | 'trend-analysis';
  period: {
    startDate: string;
    endDate: string;
  };
  filters?: TransactionFilters;
  format: 'pdf' | 'excel' | 'csv';
  includeCharts?: boolean;
}

export interface GetReportsRequest extends PaginatedRequest {
  type?: string;
  format?: string;
  startDate?: string;
  endDate?: string;
}

// Tipos para requisições de exportação/importação
export interface ExportDataRequest {
  type: 'transactions' | 'budgets' | 'goals' | 'all';
  format: 'csv' | 'excel' | 'json';
  filters?: any;
  period?: {
    startDate: string;
    endDate: string;
  };
}

export interface ImportDataRequest {
  file: File;
  type: 'transactions' | 'budgets' | 'goals';
  options?: {
    skipDuplicates?: boolean;
    updateExisting?: boolean;
    validateData?: boolean;
  };
}

// Tipos para respostas da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  pagination?: PaginationMeta;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  field?: string;
  timestamp: string;
  requestId?: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ResponseMeta {
  timestamp: string;
  version: string;
  requestId: string;
  executionTime: number;
}

// Tipos para respostas específicas
export interface TransactionResponse extends ApiResponse<Transaction> {}
export interface TransactionsResponse extends ApiResponse<Transaction[]> {}

export interface BudgetResponse extends ApiResponse<Budget> {}
export interface BudgetsResponse extends ApiResponse<Budget[]> {}

export interface GoalResponse extends ApiResponse<Goal> {}
export interface GoalsResponse extends ApiResponse<Goal[]> {}

// Tipos para estatísticas da API
export interface StatsResponse extends ApiResponse<{
  totalTransactions: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  activeBudgets: number;
  activeGoals: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    count: number;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    income: number;
    expenses: number;
    balance: number;
  }>;
}> {}

// Tipos para validação de dados
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface ValidationResponse {
  valid: boolean;
  errors: ValidationError[];
}

// Tipos para upload de arquivos
export interface UploadResponse extends ApiResponse<{
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
  uploadedAt: string;
}> {}

// Tipos para configurações da API
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
}

// Tipos para interceptadores
export interface RequestInterceptor {
  onRequest?: (config: any) => any;
  onRequestError?: (error: any) => any;
}

export interface ResponseInterceptor {
  onResponse?: (response: any) => any;
  onResponseError?: (error: any) => any;
}

// Tipos para cache
export interface CacheConfig {
  enabled: boolean;
  ttl: number; // Time to live em segundos
  maxSize: number;
  strategy: 'memory' | 'localStorage' | 'sessionStorage';
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  key: string;
}

// Tipos para webhooks
export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  timestamp: string;
  signature: string;
}

export interface WebhookConfig {
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
}

// Tipos para rate limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// Tipos para autenticação
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse extends ApiResponse<{
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}> {}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Tipos para endpoints
export interface ApiEndpoints {
  transactions: {
    list: string;
    create: string;
    get: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
    bulkDelete: string;
    stats: string;
  };
  budgets: {
    list: string;
    create: string;
    get: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
    stats: string;
  };
  goals: {
    list: string;
    create: string;
    get: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
    progress: (id: string) => string;
  };
  reports: {
    generate: string;
    list: string;
    get: (id: string) => string;
    download: (id: string) => string;
  };
  export: {
    data: string;
    status: (id: string) => string;
    download: (id: string) => string;
  };
  import: {
    data: string;
    validate: string;
    status: (id: string) => string;
  };
  auth: {
    login: string;
    logout: string;
    refresh: string;
    profile: string;
  };
}

