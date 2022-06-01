FROM node:16.15.0-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

FROM nginx:1.21.6
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/
RUN ls -la /usr/share/nginx/html/
