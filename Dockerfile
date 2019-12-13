FROM node:12.10.0-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS dev_deps
RUN npm install && npm cache clean --force

FROM dev_deps AS test
COPY . .
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
RUN npm run lint && npm run test

FROM base AS main
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ENV NODE_ENV production
RUN npm install --production && npm cache clean --force
COPY . .
RUN find ./ -type d \( -name "*__tests__*" \) -exec rm -rf {} +
EXPOSE 3000
ENV PORT 3000
ENTRYPOINT ["node"]
CMD ["index.js"]
