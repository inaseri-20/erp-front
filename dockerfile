FROM node:16.15.0-alpine AS build
FROM nginx:1.21.6
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/src/app
COPY ./packege.josn .
RUN npm install

COPY . .
RUN npm run build

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/
RUN ls -la /usr/share/nginx/html/
