FROM node:18-alpine AS development

WORKDIR /usr/src/techchallenge-app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

COPY prisma ./prisma

RUN yarn run build


FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/techchallenge-app

COPY package*.json ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/techchallenge-app/dist ./dist
RUN npx prisma generate
CMD yarn run start:prod

FROM node:18-alpine AS test
ENV NODE_ENV=test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
RUN yarn run test