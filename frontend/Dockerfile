FROM node:20.9-bullseye as dev

WORKDIR /workspace/frontend

# npm を最新にする
RUN npm install -g npm@latest

ENTRYPOINT [ "npm", "run", "dev" ]

FROM --platform=linux/x86_64 node:20.9-bullseye as deploy

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENTRYPOINT [ "npm", "start" ]
