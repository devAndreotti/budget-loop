/**
 * Schemas de validação para transações
 */

import { z } from 'zod';

export const transactionSchema = z.object({
  description: z.string().min(3, 'Descrição deve ter pelo menos 3 caracteres'),
  amount: z.number().positive('Valor deve ser positivo'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  type: z.enum(['income', 'expense'], { required_error: 'Tipo é obrigatório' }),
  date: z.date({ required_error: 'Data é obrigatória' }),
  notes: z.string().optional()
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

