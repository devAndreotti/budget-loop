/**
 * Hook para exportação de dados em formato CSV
 * Permite exportar transações, orçamentos e metas para arquivo CSV
 */

import { useState, useCallback } from 'react';
import { Transaction, Budget, Goal } from '../types';

interface UseCSVExportOptions {
  filename?: string;
  includeHeaders?: boolean;
  delimiter?: string;
  encoding?: string;
}

interface UseCSVExportReturn {
  exportTransactions: (transactions: Transaction[], options?: UseCSVExportOptions) => void;
  exportBudgets: (budgets: Budget[], options?: UseCSVExportOptions) => void;
  exportGoals: (goals: Goal[], options?: UseCSVExportOptions) => void;
  isExporting: boolean;
  error: string | null;
}

export const useCSVExport = (): UseCSVExportReturn => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para converter array de objetos em CSV
  const convertToCSV = useCallback((data: any[], headers: string[], delimiter = ','): string => {
    if (!data.length) return '';

    const csvHeaders = headers.join(delimiter);
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escapar aspas duplas e envolver em aspas se necessário
        if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(delimiter)
    );

    return [csvHeaders, ...csvRows].join('\n');
  }, []);

  // Função para fazer download do arquivo
  const downloadCSV = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, []);

  // Exportar transações
  const exportTransactions = useCallback(async (
    transactions: Transaction[], 
    options: UseCSVExportOptions = {}
  ) => {
    try {
      setIsExporting(true);
      setError(null);

      const {
        filename = `transacoes_${new Date().toISOString().split('T')[0]}.csv`,
        delimiter = ','
      } = options;

      // Definir cabeçalhos das colunas
      const headers = [
        'id',
        'description',
        'amount',
        'category',
        'type',
        'date',
        'notes',
        'createdAt'
      ];

      // Preparar dados para exportação
      const exportData = transactions.map(transaction => ({
        id: transaction.id,
        description: transaction.description,
        amount: transaction.amount.toFixed(2),
        category: transaction.category,
        type: transaction.type === 'income' ? 'Receita' : 'Despesa',
        date: new Date(transaction.date).toLocaleDateString('pt-BR'),
        notes: transaction.notes || '',
        createdAt: new Date(transaction.createdAt).toLocaleDateString('pt-BR')
      }));

      const csvContent = convertToCSV(exportData, headers, delimiter);
      downloadCSV(csvContent, filename);

    } catch (err) {
      setError('Erro ao exportar transações');
      console.error('Erro na exportação:', err);
    } finally {
      setIsExporting(false);
    }
  }, [convertToCSV, downloadCSV]);

  // Exportar orçamentos
  const exportBudgets = useCallback(async (
    budgets: Budget[], 
    options: UseCSVExportOptions = {}
  ) => {
    try {
      setIsExporting(true);
      setError(null);

      const {
        filename = `orcamentos_${new Date().toISOString().split('T')[0]}.csv`,
        delimiter = ','
      } = options;

      const headers = [
        'id',
        'name',
        'amount',
        'period',
        'categories',
        'startDate',
        'endDate',
        'spent',
        'remaining',
        'isActive',
        'createdAt'
      ];

      const exportData = budgets.map(budget => ({
        id: budget.id,
        name: budget.name,
        amount: budget.amount.toFixed(2),
        period: budget.period,
        categories: budget.categories.join('; '),
        startDate: new Date(budget.startDate).toLocaleDateString('pt-BR'),
        endDate: new Date(budget.endDate).toLocaleDateString('pt-BR'),
        spent: budget.spent.toFixed(2),
        remaining: budget.remaining.toFixed(2),
        isActive: budget.isActive ? 'Sim' : 'Não',
        createdAt: new Date(budget.createdAt).toLocaleDateString('pt-BR')
      }));

      const csvContent = convertToCSV(exportData, headers, delimiter);
      downloadCSV(csvContent, filename);

    } catch (err) {
      setError('Erro ao exportar orçamentos');
      console.error('Erro na exportação:', err);
    } finally {
      setIsExporting(false);
    }
  }, [convertToCSV, downloadCSV]);

  // Exportar metas
  const exportGoals = useCallback(async (
    goals: Goal[], 
    options: UseCSVExportOptions = {}
  ) => {
    try {
      setIsExporting(true);
      setError(null);

      const {
        filename = `metas_${new Date().toISOString().split('T')[0]}.csv`,
        delimiter = ','
      } = options;

      const headers = [
        'id',
        'name',
        'description',
        'targetAmount',
        'currentAmount',
        'deadline',
        'category',
        'priority',
        'status',
        'progress',
        'createdAt'
      ];

      const exportData = goals.map(goal => ({
        id: goal.id,
        name: goal.name,
        description: goal.description || '',
        targetAmount: goal.targetAmount.toFixed(2),
        currentAmount: goal.currentAmount.toFixed(2),
        deadline: new Date(goal.deadline).toLocaleDateString('pt-BR'),
        category: goal.category || '',
        priority: goal.priority,
        status: goal.status,
        progress: `${((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%`,
        createdAt: new Date(goal.createdAt).toLocaleDateString('pt-BR')
      }));

      const csvContent = convertToCSV(exportData, headers, delimiter);
      downloadCSV(csvContent, filename);

    } catch (err) {
      setError('Erro ao exportar metas');
      console.error('Erro na exportação:', err);
    } finally {
      setIsExporting(false);
    }
  }, [convertToCSV, downloadCSV]);

  return {
    exportTransactions,
    exportBudgets,
    exportGoals,
    isExporting,
    error
  };
};

