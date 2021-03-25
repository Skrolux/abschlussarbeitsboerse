FROM node:latest

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5200

CMD ["npm", "start"]