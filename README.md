# 💰 Budget Loop — Controle Financeiro com Visualização Inteligente
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/devAndreotti/budget-loop?color=FFF&labelColor=f3c07b&style=flat-square" />
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/devAndreotti/budget-loop?color=FFF&labelColor=f3c07b&style=flat-square" />
  <img alt="GitHub License" src="https://img.shields.io/github/license/devAndreotti/budget-loop?color=FFF&labelColor=f3c07b&style=flat-square" />
</p>

<p align="center">
  <img src="" alt="Captura de tela do Budget Loop" />
</p>

## 📋 Sobre o Projeto
**Budget Loop** é uma aplicação para controle financeiro pessoal que une **cadastro fácil de transações**, **visualização de dados por gráficos dinâmicos** e **filtros inteligentes** para análise rápida dos seus gastos e ganhos.

A interface é moderna, responsiva e modular, construída com tecnologias robustas e atuais para garantir alta performance e manutenção facilitada.

O projeto está em desenvolvimento, fundamentado em:

* **Next.js 14 (App Router)** para estrutura moderna e SSR
* **TypeScript** para segurança e tipagem clara
* **Tailwind CSS** para estilização rápida e responsiva
* **Zustand** para gerenciamento leve e eficiente do estado
* **Chart.js** para gráficos interativos
* **Zod** para validação de dados

## ⚙️ Funcionalidades Principais
* ✅ Cadastro de transações (entrada/saída) com valor, data, categoria e descrição
* 🧮 Resumo financeiro com total de entradas, saídas e saldo
* 📊 Gráficos dinâmicos: barras mensais, pizza por categoria e linha de evolução
* 🔍 Filtros avançados por mês, tipo de transação e categoria
* 🧠 Persistência local no navegador via IndexedDB
* ⬇️ Exportação para CSV
* 📱 Design responsivo para desktop, tablet e mobile
* 🌙 Suporte a tema escuro/claro *(em breve)*

## 📂 Estrutura do Projeto Atualizada
```
backend/                  # Backend Node.js (servidor, Docker)
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js

public/ 

docker-compose.yml

eslint.config.mjs

next-env.d.ts

next.config.ts

src/                      # Código frontend (Next.js App Router)
├── app/
│   ├── transactions/      # Páginas e rotas de transações
│   │   ├── new/           # Página para nova transação
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── layout.tsx         # Layout geral da aplicação
├── components/            # Componentes React reutilizáveis
│   ├── charts/            # Componentes gráficos
│   │   ├── CategoryChart.tsx
│   │   ├── DashboardCard.tsx
│   │   └── MonthlyChart.tsx
│   ├── layout/            # Componentes de layout (Header, Footer, Container)
│   ├── shared/            # Button, DatePicker, EmptyState, Imput, Loader, Select, etc
│   └── transactions-specific/  # Componentes específicos para transações (TransactionForm, TransactionItem, TransactionList)
├── config/                # Configurações, filtros e limites
│   ├── charts.ts
│   ├── filters.ts
│   ├── theme.ts
│   └── limits.ts
├── constants/             # Constantes e mensagens
│   ├── app.ts
│   └── messages.ts
├── hooks/                 # Custom hooks (ex: uso de filtros, localStorage, estatísticas)
│   ├── useCSVExport.ts
│   ├── useFilteredTransactions.ts
│   ├── useLocalStorage.ts
│   └── useTransactionStats.ts
├── lib/                   # Lógica auxiliar e utilitários
│   ├── stores/            # Stores do Zustand para estado global
│   ├── utils/             # Funções utilitárias
│   └── validations/       # Schemas e validações Zod
├── styles/                # CSS global e temas
│   ├── globals.css
│   └── theme.css
├── types/                 # Tipagens TypeScript
├── tailwind.config.ts                
│   └── postcss.config.mjs
├── middleware.ts          # Middleware Next.js (ex: autenticação)
├── package.json
├── tsconfig.json
├── .env.local
├── Dockerfile
└── next.config.ts
```

## 🚀 Como Rodar Localmente
1. Clone o repositório:

```bash
git clone https://github.com/devAndreotti/budget-loop.git
```

2. Entre na pasta do projeto:

```bash
cd budget-loop
```

3. Instale as dependências do frontend e backend:

```bash
npm install
# ou yarn
```

4. Para rodar localmente com Docker:

```bash
docker-compose up --build
```

5. Ou apenas o frontend:

```bash
npm run dev
```

## 🔮 Roadmap & Melhorias Futuras
* [ ] Finalizar componentes `TransactionForm` e `TransactionList`
* [ ] Implementar tema escuro/claro com toggle
* [ ] Integração completa com IndexedDB para persistência local
* [ ] Exportação de dados para CSV funcionando
* [ ] Autenticação multiusuário (fase 2)
* [ ] Melhorar acessibilidade (a11y) e animações

## 💪 Como Contribuir
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das alterações (`git commit -m "feat: descrição da feature"`)
4. Envie para o repositório remoto (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request e aguarde revisão

## 📝 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/devAndreotti/devAndreotti/blob/main/LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido com 💻 e ☕ por <a href="https://github.com/devAndreotti">Ricardo Andreotti Gonçalves</a>
</p>