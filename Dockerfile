FROM node:alpine

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && rm -rf /var/cache/apk/*

# Create app directory
RUN mkdir -p /usr/app/dist
WORKDIR /usr/app

# Install app dependencies
COPY package.json /usr/app/
RUN yarn install --prod

# Bundle app source
COPY dist /usr/app/dist

EXPOSE 10000
CMD [ "node", "dist/main" ]
