FROM node:latest
RUN npm install request request-promise --save
COPY context-producer.js config.js.sample /
RUN cp /config.js.sample /config.js
ENTRYPOINT nodejs /context-producer.js
