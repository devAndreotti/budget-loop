# Imagem base
FROM node:18

# Criar pasta de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta do servidor (troque se usar outra)
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "run", "dev"]
