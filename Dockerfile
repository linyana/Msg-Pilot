FROM ghcr.io/puppeteer/puppeteer:21.3.8

USER root

WORKDIR /app

COPY . .

ENV NODE_ENV=production

WORKDIR /app/apps/api

CMD npx prisma db push --accept-data-loss && node ../../dist/src/main.js