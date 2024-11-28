FROM node:18-alpine AS development

WORKDIR /usr/src/techchallenge-app

COPY package*.json ./

RUN yarn install --ignore-scripts

COPY . .

# Remove items-microservice submodule content from main backend and generate prisma
RUN rm -rf checkout-microservice && rm -rf items-microservice && npx prisma generate

COPY prisma ./prisma

RUN yarn run build


FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/techchallenge-app

COPY package*.json ./

RUN yarn install --production --ignore-scripts

COPY . .

COPY --from=development /usr/src/techchallenge-app/dist ./dist
RUN npx prisma generate
CMD [ "yarn", "run", "start:prod" ]