FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

COPY ./mylife /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN ls -la /app

RUN npm install --silent -g
RUN npm install -g serve

RUN npm run build # compile

# start app
# CMD ["npm", "start"]
CMD serve -s build -l tcp://0.0.0.0:3000
