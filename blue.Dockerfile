FROM node:18.6.0-alpine as blue


ENV TZ=Asia/Seoul

# tzdata 설치 및 설정
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install --only=production
RUN npm prune --production

WORKDIR /app
 
COPY package.json /app/
COPY package-lock.json /app/
COPY .env ./

RUN npm install

COPY ./ ./
RUN npm run build
EXPOSE 3000


CMD ["npm", "run","start:prod"]






