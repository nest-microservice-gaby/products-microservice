FROM node:21-alpine3.19

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000
