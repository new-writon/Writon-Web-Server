# Build stage (Stage 1)
FROM node:18.6.0-alpine as build

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install
COPY ./ ./
RUN npm run build 



# Production stage (Stage 2)
FROM node:18.6.0-alpine

# Install tzdata package
RUN apk update && apk add --no-cache tzdata build-base
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Copy the necessary files from the build stage
COPY --from=build /app /app
EXPOSE 3003
CMD ["npm", "run", "pm2:start"]

