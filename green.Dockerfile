
# Build stage (Stage 1)
FROM node:18.6.0-alpine as green


WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY ./ ./

# Production stage (Stage 2)
FROM node:18.6.0-alpine
RUN apk add --no-cache tzdata
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /app

# Copy the necessary files from the build stage
COPY --from=green /app /app

# Build the application
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]