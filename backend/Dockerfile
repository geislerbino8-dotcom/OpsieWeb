FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY dist ./dist
COPY .env ./

EXPOSE 5000

CMD ["node", "dist/index.js"]