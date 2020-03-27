FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

COPY . /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

RUN npm install -g serve

WORKDIR /app/mylife

RUN npm run build # compile

# start app
# CMD ["npm", "start"]
CMD serve -s build -l tcp://0.0.0.0:3000
