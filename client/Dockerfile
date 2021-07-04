FROM node:12.16.1-alpine As builder

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
  version: '1.0.0', \n\
  environment: 'prod', \n\
" > src/environments/environments.prod.ts
RUN cat src/environments/environments.prod.ts

RUN npm run build --configuration=production

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/front/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf
