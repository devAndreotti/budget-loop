// backend/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para interpretar JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Budget Loop Backend rodando 🚀');
});

// Aqui você pode adicionar suas rotas futuras:
// app.use('/api/transactions', require('./routes/transactions'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
