/**
 * Hook para calcular estatísticas de transações
 * Calcula totais, médias, tendências e análises por categoria
 */

import { useMemo } from 'react';
import { Transaction, TransactionStats, CategoryStats, MonthlyStats } from '../types';

interface UseTransactionStatsReturn extends TransactionStats {
  loading: boolean;
  isEmpty: boolean;
  topCategories: CategoryStats[];
  recentTrend: 'up' | 'down' | 'stable';
  averageMonthlyIncome: number;
  averageMonthlyExpenses: number;
}

export const useTransactionStats = (
  transactions: Transaction[],
  loading: boolean = false
): UseTransactionStatsReturn => {

  const stats = useMemo(() => {
    if (!transactions.length) {
      return {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        transactionCount: 0,
        averageTransaction: 0,
        categoryBreakdown: [],
        monthlyTrend: [],
        topCategories: [],
        recentTrend: 'stable' as const,
        averageMonthlyIncome: 0,
        averageMonthlyExpenses: 0,
        isEmpty: true
      };
    }

    // Calcular totais básicos
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    const transactionCount = transactions.length;
    const averageTransaction = transactionCount > 0 ? (totalIncome + totalExpenses) / transactionCount : 0;

    // Análise por categoria
    const categoryMap = new Map<string, { income: number; expenses: number; count: number }>();
    
    transactions.forEach(transaction => {
      const category = transaction.category;
      const current = categoryMap.get(category) || { income: 0, expenses: 0, count: 0 };
      
      if (transaction.type === 'income') {
        current.income += transaction.amount;
      } else {
        current.expenses += transaction.amount;
      }
      current.count += 1;
      
      categoryMap.set(category, current);
    });

    const categoryBreakdown: CategoryStats[] = Array.from(categoryMap.entries()).map(([category, data]) => {
      const amount = data.income + data.expenses;
      const percentage = (amount / (totalIncome + totalExpenses)) * 100;
      
      return {
        category: category as any,
        amount,
        count: data.count,
        percentage
      };
    }).sort((a, b) => b.amount - a.amount);

    // Top 5 categorias
    const topCategories = categoryBreakdown.slice(0, 5);

    // Análise mensal
    const monthlyMap = new Map<string, { income: number; expenses: number; count: number }>();
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const current = monthlyMap.get(monthKey) || { income: 0, expenses: 0, count: 0 };
      
      if (transaction.type === 'income') {
        current.income += transaction.amount;
      } else {
        current.expenses += transaction.amount;
      }
      current.count += 1;
      
      monthlyMap.set(monthKey, current);
    });

    const monthlyTrend: MonthlyStats[] = Array.from(monthlyMap.entries())
      .map(([monthKey, data]) => {
        const [year, month] = monthKey.split('-');
        return {
          month: new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('pt-BR', { month: 'short' }),
          year: parseInt(year),
          income: data.income,
          expenses: data.expenses,
          balance: data.income - data.expenses,
          transactionCount: data.count
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return new Date(`${a.month} 1, ${a.year}`).getMonth() - new Date(`${b.month} 1, ${b.year}`).getMonth();
      });

    // Calcular tendência recente (últimos 2 meses)
    let recentTrend: 'up' | 'down' | 'stable' = 'stable';
    if (monthlyTrend.length >= 2) {
      const lastMonth = monthlyTrend[monthlyTrend.length - 1];
      const previousMonth = monthlyTrend[monthlyTrend.length - 2];
      
      if (lastMonth.balance > previousMonth.balance) {
        recentTrend = 'up';
      } else if (lastMonth.balance < previousMonth.balance) {
        recentTrend = 'down';
      }
    }

    // Médias mensais
    const monthCount = monthlyTrend.length || 1;
    const averageMonthlyIncome = totalIncome / monthCount;
    const averageMonthlyExpenses = totalExpenses / monthCount;

    return {
      totalIncome,
      totalExpenses,
      balance,
      transactionCount,
      averageTransaction,
      categoryBreakdown,
      monthlyTrend,
      topCategories,
      recentTrend,
      averageMonthlyIncome,
      averageMonthlyExpenses,
      isEmpty: false
    };
  }, [transactions]);

  return {
    ...stats,
    loading,
    isEmpty: !transactions.length
  };
};

// Hook para estatísticas de período específico
export const usePeriodStats = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
) => {
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }, [transactions, startDate, endDate]);

  return useTransactionStats(filteredTransactions);
};

// Hook para comparar períodos
export const useComparePeriodsStats = (
  transactions: Transaction[],
  currentPeriod: { start: Date; end: Date },
  previousPeriod: { start: Date; end: Date }
) => {
  const currentStats = usePeriodStats(transactions, currentPeriod.start, currentPeriod.end);
  const previousStats = usePeriodStats(transactions, previousPeriod.start, previousPeriod.end);

  const comparison = useMemo(() => {
    const incomeChange = previousStats.totalIncome > 0 
      ? ((currentStats.totalIncome - previousStats.totalIncome) / previousStats.totalIncome) * 100
      : 0;

    const expensesChange = previousStats.totalExpenses > 0
      ? ((currentStats.totalExpenses - previousStats.totalExpenses) / previousStats.totalExpenses) * 100
      : 0;

    const balanceChange = currentStats.balance - previousStats.balance;

    return {
      incomeChange,
      expensesChange,
      balanceChange,
      transactionCountChange: currentStats.transactionCount - previousStats.transactionCount
    };
  }, [currentStats, previousStats]);

  return {
    current: currentStats,
    previous: previousStats,
    comparison
  };
};

