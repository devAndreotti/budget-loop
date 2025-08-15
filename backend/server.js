const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Patch para listar todas as rotas registradas
const originalUse = app.use;
app.use = function (path, ...handlers) {
  console.log('Registrando rota:', path);
  return originalUse.call(this, path, ...handlers);
};

// Middleware para parsing JSON
app.use(express.json());

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Dados simulados para transações
let transactions = [
  {
    id: 1,
    description: 'Salário',
    amount: 5000,
    type: 'income',
    category: 'Trabalho',
    date: '2024-01-15'
  },
  {
    id: 2,
    description: 'Supermercado',
    amount: -250,
    type: 'expense',
    category: 'Alimentação',
    date: '2024-01-16'
  },
  {
    id: 3,
    description: 'Conta de luz',
    amount: -120,
    type: 'expense',
    category: 'Utilidades',
    date: '2024-01-17'
  }
];

// Rotas da API

// GET /api/transactions - Listar todas as transações
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// GET /api/transactions/:id - Obter uma transação específica
app.get('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const transaction = transactions.find(t => t.id === id);
  
  if (!transaction) {
    return res.status(404).json({ error: 'Transação não encontrada' });
  }
  
  res.json(transaction);
});

// POST /api/transactions - Criar nova transação
app.post('/api/transactions', (req, res) => {
  const { description, amount, type, category, date } = req.body;
  
  if (!description || !amount || !type || !category || !date) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  const newTransaction = {
    id: transactions.length + 1,
    description,
    amount: parseFloat(amount),
    type,
    category,
    date
  };
  
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// PUT /api/transactions/:id - Atualizar transação
app.put('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const transactionIndex = transactions.findIndex(t => t.id === id);
  
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transação não encontrada' });
  }
  
  const { description, amount, type, category, date } = req.body;
  
  transactions[transactionIndex] = {
    ...transactions[transactionIndex],
    description: description || transactions[transactionIndex].description,
    amount: amount !== undefined ? parseFloat(amount) : transactions[transactionIndex].amount,
    type: type || transactions[transactionIndex].type,
    category: category || transactions[transactionIndex].category,
    date: date || transactions[transactionIndex].date
  };
  
  res.json(transactions[transactionIndex]);
});

// DELETE /api/transactions/:id - Deletar transação
app.delete('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const transactionIndex = transactions.findIndex(t => t.id === id);
  
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transação não encontrada' });
  }
  
  transactions.splice(transactionIndex, 1);
  res.status(204).send();
});

// GET /api/stats - Obter estatísticas das transações
app.get('/api/stats', (req, res) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const balance = totalIncome - totalExpenses;
  
  const categoryStats = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += Math.abs(transaction.amount);
    return acc;
  }, {});
  
  res.json({
    totalIncome,
    totalExpenses,
    balance,
    categoryStats,
    transactionCount: transactions.length
  });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
