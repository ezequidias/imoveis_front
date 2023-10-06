FROM node:14.18.2
WORKDIR /app
COPY ./ .
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start"]


# FROM nginx:1.20-alpine as web
# COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
# EXPOSE 80
