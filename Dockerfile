
# Build a small node image with static website
FROM node:10
RUN apt-get update
RUN apt-get install build-essential libudev-dev
RUN apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev -y libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
RUN apt-get install python2.7 -y python-pip -y
RUN npm install pm2 -g

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
#  using that command when you want to running with node
# CMD [ "node", "index.js" ]
#  using that command when you want to running with pm2
CMD ["pm2-runtime", "index.js"]