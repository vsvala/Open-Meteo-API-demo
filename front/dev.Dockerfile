
# specify base image
FROM node:24

# set working directory 
WORKDIR /usr/src/app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

 # Vite hot reload
CMD ["npm", "run", "dev", "--", "--host"]


#open -a Docker

#docker ps
#docker info

#docker ps listaa kaikki kontit
#docker stop CONTAINER_ID
#docker kill CONTAINER_ID
