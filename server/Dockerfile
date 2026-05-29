FROM node:24

WORKDIR /usr/src/app
# all of the following commands will have /usr/src/app set as the working dire$

COPY --chown=node:node . .
# asettaa  asettaa tiedostojen omistajaksi node-käyttäjän turvallisuussyistä(ei root)

RUN npm ci --omit=dev

ENV DEBUG=todo-backend:*

USER node

EXPOSE 3001

CMD ["npm", "start"]

#docker build -t server .
#docker run -p 3001:3001 server

#fromroot:docker compose -f server/docker-compose.yaml up --build