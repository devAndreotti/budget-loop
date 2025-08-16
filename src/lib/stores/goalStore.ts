/**
 * Store Zustand para gerenciar metas
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Goal } from '../../types';

interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  selectedIds: string[];

  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'currentAmount' | 'milestones'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getGoalById: (id: string) => Goal | undefined;
}

export const useGoalStore = create<GoalState>()(
  devtools(
    persist(
      (set, get) => ({
        goals: [],
        loading: false,
        error: null,
        selectedIds: [],

        setGoals: (goals) => set({ goals }),
        
        addGoal: (goalData) => {
          const newGoal: Goal = {
            ...goalData,
            id: crypto.randomUUID(),
            currentAmount: 0,
            milestones: [],
            createdAt: new Date(),
            updatedAt: new Date()
          };
          set((state) => ({ goals: [newGoal, ...state.goals] }));
        },

        updateGoal: (id, updates) =>
          set((state) => ({
            goals: state.goals.map((goal) =>
              goal.id === id ? { ...goal, ...updates, updatedAt: new Date() } : goal
            )
          })),

        deleteGoal: (id) =>
          set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),

        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),

        getGoalById: (id) => get().goals.find((g) => g.id === id)
      }),
      { name: 'budget-loop-goals' }
    )
  )
);

