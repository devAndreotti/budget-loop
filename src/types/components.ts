/**
 * Tipos específicos para componentes React
 * Define props, estados e interfaces para componentes da aplicação
 */

import { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { Transaction, Budget, Goal, TransactionFilters, ChartData } from './index';

// Tipos base para componentes
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  testId?: string;
}

export interface BaseFormProps extends BaseComponentProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

// Tipos para componentes de layout
export interface HeaderProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumbs?: Breadcrumb[];
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export interface SidebarProps extends BaseComponentProps {
  isOpen: boolean;
  onToggle: () => void;
  navigation: NavigationItem[];
  user?: UserInfo;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
  badge?: string | number;
  children?: NavigationItem[];
}

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
  active?: boolean;
}

export interface ContainerProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  centered?: boolean;
}

// Tipos para componentes de formulário
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
}

export interface SelectProps extends BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface DatePickerProps extends BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  value?: Date;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  clearable?: boolean;
}

export interface TextareaProps extends BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  resize?: boolean;
}

// Tipos para componentes de transação
export interface TransactionFormProps extends BaseFormProps {
  transaction?: Transaction;
  onSubmit: (data: TransactionFormData) => void;
  categories: SelectOption[];
}

export interface TransactionFormData {
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  notes?: string;
  tags?: string[];
}

export interface TransactionListProps extends BaseComponentProps {
  transactions: Transaction[];
  loading?: boolean;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
  onView?: (transaction: Transaction) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export interface TransactionItemProps extends BaseComponentProps {
  transaction: Transaction;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  compact?: boolean;
}

export interface TransactionFiltersProps extends BaseComponentProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  categories: SelectOption[];
  onReset?: () => void;
  loading?: boolean;
}

// Tipos para componentes de orçamento
export interface BudgetFormProps extends BaseFormProps {
  budget?: Budget;
  onSubmit: (data: BudgetFormData) => void;
  categories: SelectOption[];
}

export interface BudgetFormData {
  name: string;
  amount: number;
  period: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  categories: string[];
  startDate: Date;
  endDate: Date;
}

export interface BudgetCardProps extends BaseComponentProps {
  budget: Budget;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  compact?: boolean;
}

export interface BudgetProgressProps extends BaseComponentProps {
  budget: Budget;
  showDetails?: boolean;
  animated?: boolean;
}

// Tipos para componentes de meta
export interface GoalFormProps extends BaseFormProps {
  goal?: Goal;
  onSubmit: (data: GoalFormData) => void;
  categories: SelectOption[];
}

export interface GoalFormData {
  name: string;
  description?: string;
  targetAmount: number;
  deadline: Date;
  category?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface GoalCardProps extends BaseComponentProps {
  goal: Goal;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onUpdateProgress?: (amount: number) => void;
  compact?: boolean;
}

export interface GoalProgressProps extends BaseComponentProps {
  goal: Goal;
  showDetails?: boolean;
  animated?: boolean;
}

// Tipos para componentes de gráfico
export interface ChartProps extends BaseComponentProps {
  data: ChartData;
  width?: number;
  height?: number;
  responsive?: boolean;
  loading?: boolean;
}

export interface PieChartProps extends ChartProps {
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  showLegend?: boolean;
}

export interface BarChartProps extends ChartProps {
  orientation?: 'horizontal' | 'vertical';
  stacked?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
}

export interface LineChartProps extends ChartProps {
  smooth?: boolean;
  showDots?: boolean;
  showArea?: boolean;
  showGrid?: boolean;
}

export interface DashboardCardProps extends BaseComponentProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  loading?: boolean;
}

// Tipos para componentes de modal
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export interface ConfirmModalProps extends ModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'danger';
}

// Tipos para componentes de notificação
export interface NotificationProps extends BaseComponentProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface ToastProps extends NotificationProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

// Tipos para componentes de tabela
export interface TableProps<T = any> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedRows: string[]) => void;
  sortable?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string, order: 'asc' | 'desc') => void;
  pagination?: PaginationProps;
  emptyMessage?: string;
  rowKey?: keyof T | ((row: T) => string);
}

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, row: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface PaginationProps extends BaseComponentProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  pageSizeOptions?: number[];
}

// Tipos para componentes de estado vazio
export interface EmptyStateProps extends BaseComponentProps {
  title: string;
  description?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  illustration?: ReactNode;
}

// Tipos para componentes de carregamento
export interface LoaderProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'bars';
  text?: string;
  overlay?: boolean;
}

// Tipos para componentes de erro
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

export interface ErrorMessageProps extends BaseComponentProps {
  error: Error | string;
  retry?: () => void;
  showDetails?: boolean;
}

