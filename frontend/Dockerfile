FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY dist ./dist
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-p", "3000"]