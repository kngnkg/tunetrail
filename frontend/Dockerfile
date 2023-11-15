FROM node:20.9-bullseye as dev

WORKDIR /workspace/frontend

# npm を最新にする
RUN npm install -g npm@latest

ENTRYPOINT [ "npm", "run", "dev" ]
