# Etapa 1: Build (Construcción del proyecto)
FROM node:18-alpine as build
WORKDIR /app

# Copiar configuración de dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar código fuente y construir aplicación para producción
COPY . .
RUN npm run build

# Etapa 2: Producción (Servidor Web Nginx)
FROM nginx:alpine

# Copiar la configuración personalizada para SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar solo el folder /dist al contenedor de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
