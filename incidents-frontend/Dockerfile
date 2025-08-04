FROM node:22.17.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

# Instala dependencias con compatibilidad para problemas de peer dependencies.
RUN npm install --legacy-peer-deps

COPY . .

FROM node:22.17.0-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

# Copia las dependencias instaladas desde la etapa de construcción.
COPY --from=builder /app/node_modules ./node_modules

COPY . .

# Expone el puerto por defecto de Vite (5173).
EXPOSE 5173

# Inicia el servidor de desarrollo de Vite y lo hace accesible externamente.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]