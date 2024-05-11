FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN npm install -g webpack webpack-cli
RUN cd Frontend && npm install && cd .. 
RUN cd Backend && npm install && cd ..
RUN cd Frontend && npm run build:dev && cd .. 
EXPOSE 3000
CMD ["node", "Backend/server.js"]
