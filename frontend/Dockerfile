FROM node:alpine

RUN apk add --no-cache --virtual .gyp python make g++
RUN mkdir /app/
WORKDIR /app/
ADD . /app/
RUN npm install

CMD ["npm", "run", "start"]
