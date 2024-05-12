FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /app
RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main
COPY . .
RUN npm install -g webpack webpack-cli
RUN cd Frontend && npm install && cd .. 
RUN cd Backend && npm install && cd ..
RUN cd Frontend && npm run build:dev && cd .. 
EXPOSE 3000
CMD ["node", "Backend/server.js"]
