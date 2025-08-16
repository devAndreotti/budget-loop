/**
 * Tipos principais da aplicação
 * Define interfaces e tipos utilizados em toda a aplicação
 */

// Tipo base para entidades com ID
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para transações
export interface Transaction extends BaseEntity {
  description: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  date: Date;
  notes?: string;
  tags?: string[];
  recurring?: RecurringConfig;
  attachments?: Attachment[];
}

export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'alimentacao'
  | 'transporte'
  | 'moradia'
  | 'saude'
  | 'educacao'
  | 'lazer'
  | 'compras'
  | 'receita'
  | 'investimento'
  | 'outros';

// Configuração para transações recorrentes
export interface RecurringConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // A cada X dias/semanas/meses/anos
  endDate?: Date;
  maxOccurrences?: number;
}

// Tipos para orçamentos
export interface Budget extends BaseEntity {
  name: string;
  amount: number;
  period: BudgetPeriod;
  categories: TransactionCategory[];
  startDate: Date;
  endDate: Date;
  spent: number;
  remaining: number;
  isActive: boolean;
  notifications: BudgetNotification[];
}

export type BudgetPeriod = 'monthly' | 'quarterly' | 'yearly' | 'custom';

export interface BudgetNotification {
  threshold: number; // Porcentagem (ex: 80 para 80%)
  type: 'email' | 'push' | 'in-app';
  enabled: boolean;
}

// Tipos para metas financeiras
export interface Goal extends BaseEntity {
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category?: TransactionCategory;
  priority: GoalPriority;
  status: GoalStatus;
  milestones: Milestone[];
}

export type GoalPriority = 'low' | 'medium' | 'high' | 'critical';
export type GoalStatus = 'active' | 'paused' | 'completed' | 'cancelled';

export interface Milestone {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: Date;
  completed: boolean;
  completedAt?: Date;
}

// Tipos para anexos
export interface Attachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

// Tipos para filtros
export interface TransactionFilters {
  type?: TransactionType | 'all';
  category?: TransactionCategory | 'all';
  dateRange?: DateRange;
  amountRange?: AmountRange;
  search?: string;
  tags?: string[];
  sortBy?: TransactionSortField;
  sortOrder?: SortOrder;
  page?: number;
  pageSize?: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface AmountRange {
  min: number;
  max: number;
}

export type TransactionSortField = 
  | 'date'
  | 'amount'
  | 'description'
  | 'category'
  | 'createdAt';

export type SortOrder = 'asc' | 'desc';

// Tipos para estatísticas
export interface TransactionStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
  averageTransaction: number;
  categoryBreakdown: CategoryStats[];
  monthlyTrend: MonthlyStats[];
}

export interface CategoryStats {
  category: TransactionCategory;
  amount: number;
  count: number;
  percentage: number;
}

export interface MonthlyStats {
  month: string;
  year: number;
  income: number;
  expenses: number;
  balance: number;
  transactionCount: number;
}

// Tipos para relatórios
export interface Report {
  id: string;
  name: string;
  type: ReportType;
  period: DateRange;
  filters: TransactionFilters;
  data: ReportData;
  generatedAt: Date;
  format: ReportFormat;
}

export type ReportType = 
  | 'summary'
  | 'detailed'
  | 'category-analysis'
  | 'trend-analysis'
  | 'budget-performance'
  | 'goal-progress';

export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'json';

export interface ReportData {
  summary: TransactionStats;
  transactions: Transaction[];
  charts: ChartData[];
  insights: string[];
}

// Tipos para gráficos
export interface ChartData {
  type: ChartType;
  title: string;
  data: any[];
  config: ChartConfig;
}

export type ChartType = 
  | 'pie'
  | 'bar'
  | 'line'
  | 'area'
  | 'donut'
  | 'scatter';

export interface ChartConfig {
  colors?: string[];
  width?: number;
  height?: number;
  responsive?: boolean;
  legend?: boolean;
  tooltip?: boolean;
  animation?: boolean;
}

// Tipos para configurações do usuário
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'pt-BR' | 'en-US' | 'es-ES';
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  display: DisplaySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  budgetAlerts: boolean;
  goalReminders: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

export interface PrivacySettings {
  shareData: boolean;
  analytics: boolean;
  crashReports: boolean;
  dataRetention: number; // dias
}

export interface DisplaySettings {
  compactMode: boolean;
  showCents: boolean;
  groupTransactions: boolean;
  defaultView: 'list' | 'grid' | 'table';
  itemsPerPage: number;
}

// Tipos para API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  pagination?: PaginationInfo;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Tipos para formulários
export interface FormState<T = any> {
  data: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

export type FormErrors<T> = {
  [K in keyof T]?: string | string[];
};

export type FormTouched<T> = {
  [K in keyof T]?: boolean;
};

// Tipos para estado da aplicação
export interface AppState {
  user: User | null;
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  settings: UserSettings;
  ui: UIState;
  loading: LoadingState;
  error: ErrorState;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  lastLoginAt: Date;
  settings: UserSettings;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  activeModal: string | null;
  notifications: Notification[];
  breadcrumbs: Breadcrumb[];
}

export interface LoadingState {
  global: boolean;
  transactions: boolean;
  budgets: boolean;
  goals: boolean;
  reports: boolean;
}

export interface ErrorState {
  global: string | null;
  transactions: string | null;
  budgets: string | null;
  goals: string | null;
  reports: string | null;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
  createdAt: Date;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface Breadcrumb {
  label: string;
  href?: string;
  active?: boolean;
}

