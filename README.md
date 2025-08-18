# 💰 Budget Loop — Controle Financeiro com Visualização Inteligente

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/devAndreotti/budget-loop?color=FFF&labelColor=f3c07b&style=flat-square" />
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/devAndreotti/budget-loop?color=FFF&labelColor=f3c07b&style=flat-square" />
  <img alt="GitHub License" src="https://img.shields.io/github/license/devAndreotti/budget-loop?color=FFF&labelColor=f3c07b&style=flat-square" />
</p>

<p align="center">
  <!-- Adicionar uma imagem de captura de tela do projeto aqui quando disponível -->
  <img src="" alt="Captura de tela do Budget Loop" />
</p>

## 📋 Sobre o Projeto

**Budget Loop** é uma aplicação para controle financeiro pessoal que une **cadastro fácil de transações**, **visualização de dados por gráficos dinâmicos** e **filtros inteligentes** para análise rápida dos seus gastos e ganhos.

A interface é moderna, responsiva e modular, construída com tecnologias robustas e atuais para garantir alta performance e manutenção facilitada.

O projeto está em desenvolvimento, fundamentado em:

*   **Next.js 14 (App Router)** para estrutura moderna e SSR
*   **TypeScript** para segurança e tipagem clara
*   **Tailwind CSS** para estilização rápida e responsiva
*   **Zustand** para gerenciamento leve e eficiente do estado
*   **Chart.js** para gráficos interativos
*   **Zod** para validação de dados

## ⚙️ Funcionalidades Principais

*   ✅ Cadastro de transações (entrada/saída) com valor, data, categoria e descrição
*   🧮 Resumo financeiro com total de entradas, saídas e saldo
*   📊 Gráficos dinâmicos: barras mensais, pizza por categoria e linha de evolução
*   🔍 Filtros avançados por mês, tipo de transação e categoria
*   🧠 Persistência local no navegador via IndexedDB
*   ⬇️ Exportação para CSV
*   📱 Design responsivo para desktop, tablet e mobile
*   🌙 Suporte a tema escuro/claro _(em breve)_

## 📂 Estrutura do Projeto

```
backend/                      # Contém o código do backend da aplicação, incluindo o servidor Node.js e configurações Docker.
├── Dockerfile                # Define a imagem Docker para o ambiente de backend.
├── docker-compose.yml        # Configura os serviços Docker para o backend e o frontend.
├── package.json              # Lista as dependências e scripts do projeto Node.js do backend.
├── server.js                 # O ponto de entrada principal para o servidor Node.js do backend.

public/                       # Armazena arquivos estáticos que são servidos diretamente pelo Next.js, como imagens e ícones.

src/                                # Contém o código-fonte principal da aplicação frontend Next.js.
├── app/                            # Utiliza o App Router do Next.js para definir rotas e layouts da aplicação.
│   ├── transactions/               # Agrupa as páginas e rotas relacionadas às transações financeiras.
│   │   ├── new/                    # Contém a página para adicionar uma nova transação.
│   │   │   └── page.tsx            # Componente da página para o formulário de nova transação.
│   │   ├── layout.tsx              # Define o layout específico para as páginas de transações.
│   │   └── page.tsx                # Componente da página principal de listagem de transações.
│   └── layout.tsx                  # Define o layout global da aplicação, aplicado a todas as páginas.
├── components/                             # Contém componentes React reutilizáveis, organizados por funcionalidade.
│   ├── charts/                             # Componentes dedicados à exibição de gráficos e visualizações de dados.
│   │   ├── CategoryChart.tsx               # Gráfico de pizza para visualização de gastos por categoria.
│   │   ├── DashboardCard.tsx               # Componente de cartão para exibir resumos financeiros no dashboard.
│   │   └── MonthlyChart.tsx                # Gráfico de barras para visualização de transações mensais.
│   ├── layout/                         # Componentes de layout estrutural, como cabeçalho, rodapé e contêineres.
│   ├── shared/                         # Componentes genéricos e reutilizáveis (botões, inputs, seletores, etc.).
│   └── transactions-specific/          # Componentes específicos para funcionalidades de transações.
├── config/                       # Arquivos de configuração para a aplicação, como filtros e limites.
│   ├── charts.ts                 # Configurações específicas para os gráficos da aplicação.
│   ├── filters.ts                # Definições de filtros para transações (por mês, tipo, categoria).
│   ├── theme.ts                  # Configurações de tema e estilo da aplicação.
│   └── limits.ts                 # Definições de limites e validações para dados.
├── constants/                        # Armazena constantes e mensagens globais da aplicação.
│   ├── app.ts                        # Constantes relacionadas à aplicação em geral.
│   └── messages.ts                   # Mensagens de usuário, erros e notificações.
├── hooks/                                   # Contém custom hooks React para lógica reutilizável e gerenciamento de estado.
│   ├── useCSVExport.ts                      # Hook para exportar dados de transações para o formato CSV.
│   ├── useFilteredTransactions.ts           # Hook para aplicar filtros às transações.
│   ├── useLocalStorage.ts                   # Hook para persistir dados no armazenamento local do navegador.
│   └── useTransactionStats.ts               # Hook para calcular estatísticas de transações.
├── lib/                                # Biblioteca de funções auxiliares, utilitários e lógica de negócios.
│   ├── stores/                         # Stores do Zustand para gerenciamento de estado global da aplicação.
│   ├── utils/                          # Funções utilitárias diversas para manipulação de dados e formatação.
│   └── validations/                    # Schemas e funções de validação de dados usando Zod.
├── styles/                         # Arquivos CSS globais e definições de tema.
│   ├── globals.css                 # Estilos CSS globais da aplicação.
│   └── theme.css                   # Estilos relacionados ao tema (claro/escuro).
├── types/                    # Definições de tipagens TypeScript para os dados da aplicação.
├── tailwind.config.ts        # Configuração do Tailwind CSS para personalização de estilos.
├── postcss.config.mjs        # Configuração do PostCSS para processamento de CSS.
├── middleware.ts             # Middleware do Next.js para lógica de roteamento e autenticação.
├── package.json              # Lista as dependências e scripts do projeto frontend.
├── tsconfig.json             # Configuração do TypeScript para o projeto frontend.
├── .env.local                # Variáveis de ambiente locais para o desenvolvimento.
├── Dockerfile                # Dockerfile para o ambiente de frontend.
└── next.config.ts            # (Duplicado, a versão principal está na raiz) Configuração do Next.js.

docker-compose.yml           # (Duplicado, a versão principal está na raiz) Configuração do Docker Compose para orquestração de contêineres.
eslint.config.mjs            # Configurações do ESLint para manter a qualidade e o estilo do código.
next-env.d.ts                # Arquivo de declaração de tipos para o ambiente Next.js.
next.config.ts               # Configurações do Next.js, incluindo otimizações e roteamento.
```

## 🚀 Como Rodar Localmente

1.  Clone o repositório:

    ```bash
    git clone https://github.com/devAndreotti/budget-loop.git
    ```

2.  Entre na pasta do projeto:

    ```bash
    cd budget-loop
    ```

3.  Instale as dependências do frontend e backend:

    ```bash
    npm install
    # ou yarn
    ```

4.  Para rodar localmente com Docker (recomendado para ambiente de desenvolvimento completo):

    ```bash
    docker-compose up --build
    ```

5.  Ou, para rodar apenas o frontend (sem o backend Docker):

    ```bash
    npm run dev
    ```

## 🔮 Roadmap & Melhorias Futuras

*   [ ] Finalizar componentes `TransactionForm` e `TransactionList`
*   [ ] Implementar tema escuro/claro com toggle
*   [ ] Integração completa com IndexedDB para persistência local
*   [ ] Exportação de dados para CSV funcionando
*   [ ] Autenticação multiusuário (fase 2)
*   [ ] Melhorar acessibilidade (a11y) e animações

## 💪 Como Contribuir

1.  Faça um fork do repositório.
2.  Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3.  Faça commit das alterações (`git commit -m "feat: descrição da feature"`).
4.  Envie para o repositório remoto (`git push origin feature/nome-da-feature`).
5.  Abra um Pull Request e aguarde revisão.

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/devAndreotti/budget-loop/blob/main/LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido com 💻 e ☕ por <a href="https://github.com/devAndreotti">Ricardo Andreotti Gonçalves</a>
</p>
