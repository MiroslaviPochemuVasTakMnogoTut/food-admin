FROM node:20-alpine as build
WORKDIR /app
COPY *.json ./
RUN npm ci --force
COPY . .
RUN npm run build


# CMD ["npm", "run", "start:dev"]

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
ADD *.json ./
RUN npm ci --omit=dev
CMD ["node", "./dist/main.js"]
