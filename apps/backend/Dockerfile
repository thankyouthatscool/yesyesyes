FROM node:18-alpine
EXPOSE 5000

WORKDIR "/app"

COPY ./package.json ./
RUN npm install
COPY . .

RUN apk add openssl1.1-compat
RUN npm run build

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

CMD ["npm", "run", "start:prod"] 