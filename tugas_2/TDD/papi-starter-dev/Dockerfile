FROM node:18

# logged in as user "node"
USER node

# setup node environment
ENV NODE_ENV=production

# setup working directory
WORKDIR /home/node/app

# copy package.json to working directory
COPY --chown=node:node package.json ./

# install npm dependencies optimized for production
RUN npm install --omit=dev

# copy current directory to the container working directory
COPY --chown=node:node . .

# build
RUN npm run build

# expose
EXPOSE 3000

# run startup command
CMD ["node", "build/index.js"]