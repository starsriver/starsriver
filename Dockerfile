FROM daocloud.io/library/node

RUN mkdir -p /src/starsriver
WORKDIR /src/starsriver

COPY . /src/starsriver
RUN npm install -g yarn
RUN yarn install

EXPOSE 80

CMD ["yarn", "start"]