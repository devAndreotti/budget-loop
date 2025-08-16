import React, { useState } from 'react';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { DatePicker } from '../shared/DatePicker';
import { Button } from '../shared/Button';

interface TransactionFormData {
  description: string;
  amount: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<TransactionFormData>;
  isLoading?: boolean;
}

const CATEGORIES = [
  { value: 'Trabalho', label: 'Trabalho' },
  { value: 'Alimentação', label: 'Alimentação' },
  { value: 'Transporte', label: 'Transporte' },
  { value: 'Utilidades', label: 'Utilidades' },
  { value: 'Entretenimento', label: 'Entretenimento' },
  { value: 'Saúde', label: 'Saúde' },
  { value: 'Educação', label: 'Educação' },
  { value: 'Outros', label: 'Outros' }
];

const TYPE_OPTIONS = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' }
];

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
  isLoading = false
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    description: initialData.description || '',
    amount: initialData.amount || '',
    type: initialData.type || 'expense',
    category: initialData.category || '',
    date: initialData.date || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Partial<TransactionFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<TransactionFormData> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof TransactionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Descrição"
        value={formData.description}
        onChange={(value) => updateField('description', value)}
        placeholder="Ex: Salário, Supermercado, etc."
        required
        error={errors.description}
      />

      <Input
        type="number"
        label="Valor"
        value={formData.amount}
        onChange={(value) => updateField('amount', value)}
        placeholder="0.00"
        required
        error={errors.amount}
      />

      <Select
        label="Tipo"
        value={formData.type}
        onChange={(value) => updateField('type', value as 'income' | 'expense')}
        options={TYPE_OPTIONS}
        required
      />

      <Select
        label="Categoria"
        value={formData.category}
        onChange={(value) => updateField('category', value)}
        options={CATEGORIES}
        placeholder="Selecione uma categoria"
        required
        error={errors.category}
      />

      <DatePicker
        label="Data"
        value={formData.date}
        onChange={(value) => updateField('date', value)}
        required
        error={errors.date}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
