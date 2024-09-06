# 빌드 단계 (Stage 1)
FROM node:18.6.0-alpine as build

WORKDIR /app

# package 파일 복사 및 종속성 설치
COPY package.json /app
COPY package-lock.json /app
RUN npm install --build-from-source

# 소스 코드 복사
COPY ./ ./

# 프로덕션 단계 (Stage 2)
FROM node:18.6.0-alpine

# Alpine에 필요한 패키지 설치
RUN apk update && apk add --no-cache tzdata build-base python3

# bcrypt 소스에서 재빌드
RUN npm rebuild bcrypt --build-from-source

# 타임존 설정
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# 빌드 단계에서 파일 복사
COPY --from=build /app /app

# 애플리케이션 빌드
RUN npm run build

# 프로덕션 의존성 설치
RUN npm install --production --build-from-source

EXPOSE 3003
CMD ["npm", "run", "start:prod"]
