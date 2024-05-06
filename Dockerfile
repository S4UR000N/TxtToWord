FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY Frontend/package.json Frontend/
COPY Backend/package.json Backend/
RUN cd Frontend && npm install && cd .. 
RUN cd Backend && npm install && cd ..
COPY . .
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["node", "Backend/server.js"]