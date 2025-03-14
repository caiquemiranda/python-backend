FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de configuração
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "start"] 