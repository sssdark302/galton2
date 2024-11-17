# Etapa 1: Build de la aplicación
FROM node:18 as builder

# Etapa 2: Configuración del servidor para servir los archivos estáticos
FROM nginx:alpine

# Copiar los archivos generados por el build al servidor NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto que usará el servidor NGINX
EXPOSE 80

# Comando por defecto para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
