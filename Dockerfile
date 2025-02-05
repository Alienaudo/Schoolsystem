FROM node:v23.6.0

WORKDIR /app

EXPOSE 3307:3306

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install

COPY . .
