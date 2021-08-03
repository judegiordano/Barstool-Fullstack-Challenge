FROM node:current-alpine
WORKDIR /usr/src/app

COPY . ./
RUN npm ci
RUN npm run build

# set to production
ENV NODE_ENV production

EXPOSE 3000

CMD "npm" "run" "start"