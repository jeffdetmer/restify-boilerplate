FROM node:7-alpine as base

RUN apk update -y --no-cache && apk upgrade -y --no-cache

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app
RUN mkdir -p /usr/app/logs

# Install app dependencies
COPY package.json /usr/app/

# Bundle app source
ADD node_modules /usr/app/node_modules
ADD dist /usr/app/dist
ADD src /usr/app/src

CMD [ "node", "dist/index" ]

FROM node:7-alpine as app

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=base /usr/app/dist

CMD ["./app"]
