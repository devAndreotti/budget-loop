FROM node:22-alpine

WORKDIR /app

# package.json já está na raiz (contexto .), então funciona
COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--port", "3000"]
