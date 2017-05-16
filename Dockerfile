FROM oraclelinux:7.3 as base

COPY ./internals/repos/yarn.repo /etc/yum.repos.d/yarn.repo

RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
RUN yum makecache fast
RUN yum install -y deltarpm
RUN yum update -y
RUN yum install make gcc nodejs yarn -y

RUN mkdir -p /opt/oracle && \
    cd /opt/oracle && \
    wget https://s3.amazonaws.com/sequelize/instantclient-basic-linux.x64-12.1.0.2.0.zip && \
    wget https://s3.amazonaws.com/sequelize/instantclient-sdk-linux.x64-12.1.0.2.0.zip && \
    unzip instantclient-basic-linux.x64-12.1.0.2.0.zip && \
    unzip instantclient-sdk-linux.x64-12.1.0.2.0.zip && \
    mv instantclient_12_1 instantclient && \
    cd instantclient && \
    ln -s libclntsh.so.12.1 libclntsh.so && \
    export LD_LIBRARY_PATH=/opt/oracle/instantclient:$LD_LIBRARY_PATH

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app
RUN mkdir -p /usr/app/logs

# Install app dependencies
COPY package.json /usr/app/
RUN npm install -g pm2

# Bundle app source
ADD node_modules /usr/app/node_modules
ADD dist /usr/app/dist
ADD src /usr/app/src

EXPOSE 10000
CMD [ "node", "dist/index" ]

FROM node:7-alpine as app

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=base /usr/app/dist

CMD ["./app"]
