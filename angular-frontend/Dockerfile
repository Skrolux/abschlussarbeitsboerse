#Phase 1

#Hier bauen wir die Angular App zusammen

FROM node:latest as phase1

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Phase 2
# Hier bauen wir den Webserver zusammen
# Wir holen uns hier ein Image und kopieren anschließend die fertig kompilierte App 
# in das Directory vom Webserver

FROM nginx:1.19-alpine

COPY --from=phase1 /app/dist/abschlussarbeitsboerse-frontend /usr/share/nginx/html
