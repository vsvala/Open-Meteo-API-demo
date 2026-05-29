FROM node:24-slim

WORKDIR /usr/src/app
# all of the following commands will have /usr/src/app set as the working dire$

# Kopioi package.json ensin (cache-optimoitu)
COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .
# asettaa  asettaa tiedostojen omistajaksi node-käyttäjän turvallisuussyistä(ei root)

ENV NODE_ENV=production

#ENV DEBUG=todo-backend:* --> deviin

USER node

EXPOSE 3001

# Optional healthcheck (jos sinulla /health endpoint)
# HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3001/health || exit 1


CMD ["npm", "start"]




#docker build -t server . hakee imagen ja luo
#docker run -p 3001:3001 server
#docker ps listaa kaikki kontit
#docker stop CONTAINER_ID
#docker kill CONTAINER_ID

#fromroot:docker compose -f server/docker-compose.yaml up --build

#Jos useampi services:
#docker compose -f docker-compose.dev.yml up -d
# docker compose -f docker-compose.dev.yml down --volumes

#docker images listaa kaikki imaget