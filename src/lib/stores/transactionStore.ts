/**
 * Store Zustand para gerenciar transações
 * Centraliza o estado e ações relacionadas às transações
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Transaction, TransactionFilters } from '../../types';

interface TransactionState {
  // Estado
  transactions: Transaction[];
  filters: TransactionFilters;
  loading: boolean;
  error: string | null;
  selectedIds: string[];

  // Ações
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  deleteMultipleTransactions: (ids: string[]) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedIds: (ids: string[]) => void;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  
  // Getters computados
  getTransactionById: (id: string) => Transaction | undefined;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
  getTransactionsByCategory: (category: string) => Transaction[];
  getTransactionsByDateRange: (startDate: Date, endDate: Date) => Transaction[];
}

const defaultFilters: TransactionFilters = {
  type: 'all',
  category: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1,
  pageSize: 20
};

export const useTransactionStore = create<TransactionState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        transactions: [],
        filters: defaultFilters,
        loading: false,
        error: null,
        selectedIds: [],

        // Ações
        setTransactions: (transactions) => 
          set({ transactions }, false, 'setTransactions'),

        addTransaction: (transactionData) => {
          const newTransaction: Transaction = {
            ...transactionData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          set(
            (state) => ({
              transactions: [newTransaction, ...state.transactions]
            }),
            false,
            'addTransaction'
          );
        },

        updateTransaction: (id, updates) =>
          set(
            (state) => ({
              transactions: state.transactions.map((transaction) =>
                transaction.id === id
                  ? { ...transaction, ...updates, updatedAt: new Date() }
                  : transaction
              )
            }),
            false,
            'updateTransaction'
          ),

        deleteTransaction: (id) =>
          set(
            (state) => ({
              transactions: state.transactions.filter((t) => t.id !== id),
              selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id)
            }),
            false,
            'deleteTransaction'
          ),

        deleteMultipleTransactions: (ids) =>
          set(
            (state) => ({
              transactions: state.transactions.filter((t) => !ids.includes(t.id)),
              selectedIds: state.selectedIds.filter((selectedId) => !ids.includes(selectedId))
            }),
            false,
            'deleteMultipleTransactions'
          ),

        setFilters: (newFilters) =>
          set(
            (state) => ({
              filters: { ...state.filters, ...newFilters }
            }),
            false,
            'setFilters'
          ),

        resetFilters: () =>
          set({ filters: defaultFilters }, false, 'resetFilters'),

        setLoading: (loading) =>
          set({ loading }, false, 'setLoading'),

        setError: (error) =>
          set({ error }, false, 'setError'),

        setSelectedIds: (selectedIds) =>
          set({ selectedIds }, false, 'setSelectedIds'),

        toggleSelection: (id) =>
          set(
            (state) => ({
              selectedIds: state.selectedIds.includes(id)
                ? state.selectedIds.filter((selectedId) => selectedId !== id)
                : [...state.selectedIds, id]
            }),
            false,
            'toggleSelection'
          ),

        selectAll: () =>
          set(
            (state) => ({
              selectedIds: state.transactions.map((t) => t.id)
            }),
            false,
            'selectAll'
          ),

        clearSelection: () =>
          set({ selectedIds: [] }, false, 'clearSelection'),

        // Getters computados
        getTransactionById: (id) => {
          const state = get();
          return state.transactions.find((t) => t.id === id);
        },

        getTotalIncome: () => {
          const state = get();
          return state.transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        },

        getTotalExpenses: () => {
          const state = get();
          return state.transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        },

        getBalance: () => {
          const state = get();
          return state.getTotalIncome() - state.getTotalExpenses();
        },

        getTransactionsByCategory: (category) => {
          const state = get();
          return state.transactions.filter((t) => t.category === category);
        },

        getTransactionsByDateRange: (startDate, endDate) => {
          const state = get();
          return state.transactions.filter((t) => {
            const transactionDate = new Date(t.date);
            return transactionDate >= startDate && transactionDate <= endDate;
          });
        }
      }),
      {
        name: 'budget-loop-transactions',
        partialize: (state) => ({
          transactions: state.transactions,
          filters: state.filters
        })
      }
    ),
    {
      name: 'transaction-store'
    }
  )
);

// Seletores para otimizar re-renders
export const useTransactions = () => useTransactionStore((state) => state.transactions);
export const useTransactionFilters = () => useTransactionStore((state) => state.filters);
export const useTransactionLoading = () => useTransactionStore((state) => state.loading);
export const useTransactionError = () => useTransactionStore((state) => state.error);
export const useSelectedTransactions = () => useTransactionStore((state) => state.selectedIds);

// Ações
export const useTransactionActions = () => useTransactionStore((state) => ({
  setTransactions: state.setTransactions,
  addTransaction: state.addTransaction,
  updateTransaction: state.updateTransaction,
  deleteTransaction: state.deleteTransaction,
  deleteMultipleTransactions: state.deleteMultipleTransactions,
  setFilters: state.setFilters,
  resetFilters: state.resetFilters,
  setLoading: state.setLoading,
  setError: state.setError,
  setSelectedIds: state.setSelectedIds,
  toggleSelection: state.toggleSelection,
  selectAll: state.selectAll,
  clearSelection: state.clearSelection
}));

// Getters
export const useTransactionGetters = () => useTransactionStore((state) => ({
  getTransactionById: state.getTransactionById,
  getTotalIncome: state.getTotalIncome,
  getTotalExpenses: state.getTotalExpenses,
  getBalance: state.getBalance,
  getTransactionsByCategory: state.getTransactionsByCategory,
  getTransactionsByDateRange: state.getTransactionsByDateRange
}));

