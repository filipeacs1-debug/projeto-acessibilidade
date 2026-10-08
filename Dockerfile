FROM nginx:alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o projeto para o diretório público do Nginx
COPY . /usr/share/nginx/html/

# Expõe a porta HTTP
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
