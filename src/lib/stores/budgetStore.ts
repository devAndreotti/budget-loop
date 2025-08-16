/**
 * Store Zustand para gerenciar orçamentos
 * Centraliza o estado e ações relacionadas aos orçamentos
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Budget } from '../../types';

interface BudgetState {
  // Estado
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  selectedIds: string[];

  // Ações
  setBudgets: (budgets: Budget[]) => void;
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt' | 'spent' | 'remaining'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  deleteMultipleBudgets: (ids: string[]) => void;
  updateBudgetSpent: (id: string, spent: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedIds: (ids: string[]) => void;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  
  // Getters computados
  getBudgetById: (id: string) => Budget | undefined;
  getActiveBudgets: () => Budget[];
  getBudgetsByCategory: (category: string) => Budget[];
  getBudgetsByPeriod: (period: string) => Budget[];
  getOverBudgets: () => Budget[];
  getNearLimitBudgets: (threshold?: number) => Budget[];
}

export const useBudgetStore = create<BudgetState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        budgets: [],
        loading: false,
        error: null,
        selectedIds: [],

        // Ações
        setBudgets: (budgets) => 
          set({ budgets }, false, 'setBudgets'),

        addBudget: (budgetData) => {
          const newBudget: Budget = {
            ...budgetData,
            id: crypto.randomUUID(),
            spent: 0,
            remaining: budgetData.amount,
            createdAt: new Date(),
            updatedAt: new Date(),
            notifications: []
          };
          
          set(
            (state) => ({
              budgets: [newBudget, ...state.budgets]
            }),
            false,
            'addBudget'
          );
        },

        updateBudget: (id, updates) =>
          set(
            (state) => ({
              budgets: state.budgets.map((budget) =>
                budget.id === id
                  ? { 
                      ...budget, 
                      ...updates, 
                      updatedAt: new Date(),
                      remaining: (updates.amount ?? budget.amount) - (updates.spent ?? budget.spent)
                    }
                  : budget
              )
            }),
            false,
            'updateBudget'
          ),

        deleteBudget: (id) =>
          set(
            (state) => ({
              budgets: state.budgets.filter((b) => b.id !== id),
              selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id)
            }),
            false,
            'deleteBudget'
          ),

        deleteMultipleBudgets: (ids) =>
          set(
            (state) => ({
              budgets: state.budgets.filter((b) => !ids.includes(b.id)),
              selectedIds: state.selectedIds.filter((selectedId) => !ids.includes(selectedId))
            }),
            false,
            'deleteMultipleBudgets'
          ),

        updateBudgetSpent: (id, spent) =>
          set(
            (state) => ({
              budgets: state.budgets.map((budget) =>
                budget.id === id
                  ? { 
                      ...budget, 
                      spent,
                      remaining: budget.amount - spent,
                      updatedAt: new Date()
                    }
                  : budget
              )
            }),
            false,
            'updateBudgetSpent'
          ),

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
              selectedIds: state.budgets.map((b) => b.id)
            }),
            false,
            'selectAll'
          ),

        clearSelection: () =>
          set({ selectedIds: [] }, false, 'clearSelection'),

        // Getters computados
        getBudgetById: (id) => {
          const state = get();
          return state.budgets.find((b) => b.id === id);
        },

        getActiveBudgets: () => {
          const state = get();
          return state.budgets.filter((b) => b.isActive);
        },

        getBudgetsByCategory: (category) => {
          const state = get();
          return state.budgets.filter((b) => b.categories.includes(category as any));
        },

        getBudgetsByPeriod: (period) => {
          const state = get();
          return state.budgets.filter((b) => b.period === period);
        },

        getOverBudgets: () => {
          const state = get();
          return state.budgets.filter((b) => b.spent > b.amount);
        },

        getNearLimitBudgets: (threshold = 80) => {
          const state = get();
          return state.budgets.filter((b) => {
            const percentage = (b.spent / b.amount) * 100;
            return percentage >= threshold && percentage < 100;
          });
        }
      }),
      {
        name: 'budget-loop-budgets',
        partialize: (state) => ({
          budgets: state.budgets
        })
      }
    ),
    {
      name: 'budget-store'
    }
  )
);

// Seletores para otimizar re-renders
export const useBudgets = () => useBudgetStore((state) => state.budgets);
export const useBudgetLoading = () => useBudgetStore((state) => state.loading);
export const useBudgetError = () => useBudgetStore((state) => state.error);
export const useSelectedBudgets = () => useBudgetStore((state) => state.selectedIds);

// Ações
export const useBudgetActions = () => useBudgetStore((state) => ({
  setBudgets: state.setBudgets,
  addBudget: state.addBudget,
  updateBudget: state.updateBudget,
  deleteBudget: state.deleteBudget,
  deleteMultipleBudgets: state.deleteMultipleBudgets,
  updateBudgetSpent: state.updateBudgetSpent,
  setLoading: state.setLoading,
  setError: state.setError,
  setSelectedIds: state.setSelectedIds,
  toggleSelection: state.toggleSelection,
  selectAll: state.selectAll,
  clearSelection: state.clearSelection
}));

// Getters
export const useBudgetGetters = () => useBudgetStore((state) => ({
  getBudgetById: state.getBudgetById,
  getActiveBudgets: state.getActiveBudgets,
  getBudgetsByCategory: state.getBudgetsByCategory,
  getBudgetsByPeriod: state.getBudgetsByPeriod,
  getOverBudgets: state.getOverBudgets,
  getNearLimitBudgets: state.getNearLimitBudgets
}));

