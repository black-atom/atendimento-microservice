FROM node:alpine

MAINTAINER Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>


RUN apk add --update tzdata
ENV TZ=America/Sao_Paulo
RUN rm -rf /var/cache/apk/*

ADD . /usr/src/app

WORKDIR /usr/src/app

ENV NODE_ENV="production"
ENV DB_USERNAME=""
ENV DB_PASSWORD=""
ENV DB_URL="mongodb://172.17.0.1/test"

RUN yarn

EXPOSE 3000
VOLUME /usr/src/app/public/imagens

CMD [ "bin/www" ]