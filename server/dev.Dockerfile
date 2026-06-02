FROM node:24-slim

WORKDIR /usr/src/app
# all of the following commands will have /usr/src/app set as the working dire$

# Kopioi package.json ensin (cache-optimoitu)
COPY package*.json ./

RUN npm ci  && npm cache clean --force

ENV NODE_ENV=development

#ENV DEBUG=todo-backend:* --> deviin


CMD ["node", "--watch", "server.js"]



#docker build -f dev.Dockerfile -t server-dev  hakee imagen ja luo
#docker run -p 3001:3001 -v $(pwd):/usr/src/app server-dev
#docker ps listaa kaikki kontit
#docker stop CONTAINER_ID
#docker kill CONTAINER_ID

#fromroot:docker compose -f server/docker-compose.yaml up --build

#Jos useampi services:
#docker compose -f docker-compose.dev.yml up -d
# docker compose -f docker-compose.dev.yml down --volumes

#docker images listaa kaikki imaget