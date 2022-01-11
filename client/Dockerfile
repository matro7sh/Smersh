FROM node:12.16.1-alpine AS runner

WORKDIR /usr/src/app

ARG API_BASE_URL
ARG TRANSPORT
ENV API_BASE_URL $API_BASE_URL
ENV TRANSPORT $TRANSPORT
RUN echo "Api base url: ${TRANSPORT}${API_BASE_URL}"

COPY package.json ./
RUN npm install

COPY . .

RUN echo -e "\
export const environment = { \n\
  production: true, \n\
  API_DOMAIN: '${API_BASE_URL}', \n\
  TRANSPORT: '${TRANSPORT}', \n\
  API_ENDPOINT: '/api', \n\
  MAPS_KEY: '', \n\
  version: '1.1.3', \n\
  environment: 'prod', \n\
} \n\
" > src/environments/environment.prod.ts
RUN echo -e "\
export const environment = { \n\
  production: true, \n\
  API_DOMAIN: '${API_BASE_URL}', \n\
  TRANSPORT: '${TRANSPORT}', \n\
  API_ENDPOINT: '/api', \n\
  MAPS_KEY: '', \n\
  version: '1.1.3', \n\
  environment: 'prod', \n\
} \n\
" > src/environments/environment.ts

FROM node:12.16.1-alpine AS builder
WORKDIR /usr/src/app
COPY --from=runner /usr/src/app/ .
RUN npm install
RUN npm run build --configuration=prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/front/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf
