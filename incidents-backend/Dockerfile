# Stage 1: Build the NestJS application
# Usamos una imagen base de Node.js que coincide con tu versión para asegurar compatibilidad.
FROM node:22.17.0-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de paquetes para instalar dependencias
COPY package.json yarn.lock* package-lock.json* ./

# Instala las dependencias. Usamos npm ci para instalaciones limpias y reproducibles.
RUN npm ci

# Copia todo el código fuente de la aplicación
COPY . .

# Compila la aplicación NestJS
# Asegúrate de que tu script de build en package.json sea 'nest build' o similar
RUN npm run build

# Stage 2: Run the application
# Usamos una imagen más ligera para el entorno de producción
FROM node:22.17.0-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Crea un directorio específico para la base de datos y asegura los permisos correctos
# Esto es crucial para SQLite con volúmenes en Docker
# Cambiamos chown a un usuario que generalmente existe o simplemente a root para asegurar la escritura,
# o, mejor, creamos el directorio y no cambiamos el chown aquí si el usuario de la imagen
# es capaz de escribir en el directorio por defecto.
# Sin el USER node, el usuario por defecto de la imagen de node-alpine suele ser un usuario con UID 1000 que tiene permisos para escribir.
RUN mkdir -p /app/data && chown 1000:1000 /app/data # Asignamos a UID 1000, un usuario común no-root en Alpine
# QUITAMOS LA LÍNEA: USER node # <--- ESTA LÍNEA ES LA CAUSANTE DEL ERROR

# Copia los archivos de definición de paquetes (solo para producción, sin devDependencies)
COPY package.json yarn.lock* package-lock.json* ./

# Instala solo las dependencias de producción
RUN npm install --production

# Copia los archivos compilados de la etapa 'builder'
COPY --from=builder /app/dist ./dist

# Expone el puerto por defecto que tu aplicación escucha.
EXPOSE 8080

# Comando para iniciar la aplicación.
CMD ["node", "dist/main"]