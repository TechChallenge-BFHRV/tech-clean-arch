FROM node:18-alpine AS development

WORKDIR /usr/src/techchallenge-app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/techchallenge-app

COPY package*.json ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/techchallenge-app/dist ./dist

CMD ["node", "dist/main"]