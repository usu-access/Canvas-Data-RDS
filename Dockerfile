FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

ENV PORT=7000

EXPOSE 7000

CMD ["pm2-runtime", "index.js"]
