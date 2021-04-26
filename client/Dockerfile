# base image
FROM node:12.2.0 AS client_angular

ARG HTTP_PROXY_URL
ARG HTTPS_PROXY_URL

# Setting proxy conf for Cypress download
ENV HTTPS_PROXY=$HTTPS_PROXY_URL
ENV HTTP_PROXY=$HTTP_PROXY_URL

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY client/package.json /app/package.json

RUN if [ -n "$HTTP_PROXY_URL" ] ; then npm config set proxy $HTTP_PROXY_URL ; : ; fi
RUN if [ -n "$HTTPS_PROXY_URL" ] ; then npm config set https-proxy $HTTPS_PROXY_URL ; : ; fi
RUN npm install    
RUN npm install -g @angular/cli@7.3.9

# add app
COPY client/ /app

# start app
CMD ng serve --host 0.0.0.0

