FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm install --force

CMD ["npm", "run", "start:dev"]
