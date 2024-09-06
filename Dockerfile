# Build stage (Stage 1)
FROM node:18.6.0-alpine as build

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY ./ ./

# Production stage (Stage 2)
FROM node:18.6.0-alpine

# Install tzdata package
RUN apt-get update && apt-get install -y tzdata
RUN npm rebuild bcrypt --build-from-source

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Copy the necessary files from the build stage
COPY --from=build /app /app

# Build the application
RUN npm run build

# Install production dependencies
RUN npm install --production

EXPOSE 3003
CMD ["npm", "run", "start:prod"]
