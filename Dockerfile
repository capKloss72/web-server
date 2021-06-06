# Specify a base image
FROM node:alpine
WORKDIR /usr/app

# Run installation of depenancies
COPY ./ ./
RUN npm install -g npm@7.16.0

# Specify startup command
CMD ["npm", "start"]