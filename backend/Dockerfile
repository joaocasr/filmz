# Using node:20-bullseye as the base image for the Node.js application backend
FROM node:20-bullseye 

# Creating the working directory named `app`
WORKDIR /app

# Copying all dependencies in the package.json file to the working directory `app`
COPY package.json .

#Installing the dependencies in the container
RUN npm install

#Copying all the application source code and files to the working directory `app`
COPY . .

#Exposing the container to run on the port 7777
EXPOSE 7777

CMD ["npm","start"]
