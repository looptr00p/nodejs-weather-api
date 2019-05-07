FROM node:8-alpine
WORKDIR /srv
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]