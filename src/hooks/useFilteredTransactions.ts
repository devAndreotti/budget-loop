/**
 * Hook para filtrar e ordenar transações
 * Aplica filtros, busca e ordenação nas transações
 */

import { useMemo } from 'react';
import { Transaction, TransactionFilters } from '../types';

interface UseFilteredTransactionsReturn {
  filteredTransactions: Transaction[];
  totalCount: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export const useFilteredTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters
): UseFilteredTransactionsReturn => {
  
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Filtro por tipo
    if (filters.type && filters.type !== 'all') {
      result = result.filter(transaction => transaction.type === filters.type);
    }

    // Filtro por categoria
    if (filters.category && filters.category !== 'all') {
      result = result.filter(transaction => transaction.category === filters.category);
    }

    // Filtro por período
    if (filters.dateRange) {
      const { startDate, endDate } = filters.dateRange;
      result = result.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    // Filtro por valor
    if (filters.amountRange) {
      const { min, max } = filters.amountRange;
      result = result.filter(transaction => 
        transaction.amount >= min && transaction.amount <= max
      );
    }

    // Filtro por busca textual
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm) ||
        transaction.notes?.toLowerCase().includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm)
      );
    }

    // Filtro por tags
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(transaction =>
        transaction.tags?.some(tag => filters.tags!.includes(tag))
      );
    }

    // Ordenação
    if (filters.sortBy) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (filters.sortBy) {
          case 'date':
            aValue = new Date(a.date);
            bValue = new Date(b.date);
            break;
          case 'amount':
            aValue = a.amount;
            bValue = b.amount;
            break;
          case 'description':
            aValue = a.description.toLowerCase();
            bValue = b.description.toLowerCase();
            break;
          case 'category':
            aValue = a.category.toLowerCase();
            bValue = b.category.toLowerCase();
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return filters.sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return filters.sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // Paginação
    if (filters.page && filters.pageSize) {
      const startIndex = (filters.page - 1) * filters.pageSize;
      const endIndex = startIndex + filters.pageSize;
      result = result.slice(startIndex, endIndex);
    }

    return result;
  }, [transactions, filters]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const totalCount = filteredTransactions.length;
    
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;

    return {
      totalCount,
      totalIncome,
      totalExpenses,
      balance
    };
  }, [filteredTransactions]);

  return {
    filteredTransactions,
    ...stats
  };
};

