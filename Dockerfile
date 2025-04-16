FROM node:23

WORKDIR /app

EXPOSE 3307:3306

RUN apt-get update && \
    apt-get install -y node

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .
