import React from 'react';
import { Button } from '../shared/Button';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: number) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
  const amountPrefix = isIncome ? '+' : '-';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">
              {transaction.description}
            </h3>
            <span className={`font-semibold ${amountColor}`}>
              {amountPrefix}{formatCurrency(transaction.amount)}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {transaction.category}
            </span>
            <span>{formatDate(transaction.date)}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isIncome 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isIncome ? 'Receita' : 'Despesa'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          {onEdit && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onEdit(transaction)}
            >
              Editar
            </Button>
          )}
          
          {onDelete && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete(transaction.id)}
            >
              Excluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
