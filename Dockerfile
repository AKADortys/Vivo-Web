# Étape 1 : Build de l'application Angular
FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Étape 2 : Serveur Nginx final
FROM nginx:stable-alpine
# Copie du build Angular (le chemin dist/vivo-web/browser dépend de votre angular.json)
COPY --from=build-stage /app/dist/Vivo-Web/browser /usr/share/nginx/html
# Copie de la configuration Nginx rédigée ci-dessus
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]