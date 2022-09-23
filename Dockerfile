FROM node:lts-alpine

WORKDIR /opt/deploy/

COPY . .

RUN npm install && npm install yarn

RUN yarn build

WORKDIR /opt/deploy/

RUN yarn install

CMD ["yarn" , "start"]

EXPOSE 3000