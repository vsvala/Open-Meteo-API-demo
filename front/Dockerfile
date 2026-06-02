# 1. BUILD STAGE
# =========================

# specify base image
FROM node:24 AS builder

# set working directory 
WORKDIR /usr/src/app

# copy files and install dependencies
COPY package*.json ./
RUN npm ci
COPY . .

# build Vite app    
RUN npm run build

# 2. PRODUCTION STAGE
# =========================
FROM nginx:alpine

# remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# copy build output
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# optional: custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# specify which port to expose
EXPOSE 80 
#nginx listens on port 80 by default
#EXPOSE 5173

#Nginx web server eli käynnistää web-palvelimen
CMD ["nginx", "-g", "daemon off;"]
#	web server -g	anna config komentoriviltä daemon off;	älä mene taustalle


# install serve to run the app
#RUN npm install -g serve 

# start serve (demo purposes...nginx in production)
#CMD ["serve", "-n", "dist"]

#open -a Docker

#buildaus    docker build -t front .
#ajaminen    docker run -p 5173:5173 front

#docker ps
#docker info

#docker ps listaa kaikki imaget
#docker stop CONTAINER_ID
#docker kill CONTAINER_ID
