FROM oraclelinux:7.3

RUN yum makecache fast
RUN yum install -y deltarpm
RUN yum update -y

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
    
RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
RUN yum -y install nodejs
RUN yum groupinstall -y "Development Tools"

# Create app directory
RUN mkdir -p /usr/app/dist
WORKDIR /usr/app

# Install app dependencies
COPY package.json /usr/app/
RUN npm install -g yarn pm2
RUN yarn install --prod

# Bundle app source
COPY dist /usr/app/dist

EXPOSE 10000
CMD [ "node", "dist/index" ]
