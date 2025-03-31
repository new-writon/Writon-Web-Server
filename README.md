# ✏ WRITON

## 💻 기술 스택

---

| 분류 | 개발환경 | 
|---|---|
| 운영체제 | Mac OS |
| 개발도구 | VSCode, Postman |
| 프레임워크 | Node.js 18.6, Nest.js |
| 데이터베이스 | Mysql(8.0.35), Redis (7.1.0)|
| 버전 관리 | Github, Git |
| 협업 툴 | Slack, Notion |
| 배포 및 운영 | AWS, Docker, Github Actions, Nginx, CloudWatch, Clarity |


## 🛠 세부 기술 스택(Tech Stack)

### 백엔드(Back-end)

- **Node.js 18.6**

### 데이터베이스(Database)

- **Mysql (8.0.35)**
- **Redis (7.1.0)**

### 클라우드 서비스(Amazon Web Service)
  - AWS EC2
  - AWS RDS
  - AWS Elastic Load Balancing
  - AWS Cloud Watch
  - AWS Cloud Watch Event
  - AWS Lambda

📌 **Code Convention**

- **변수**
    1. 변수명은 Camel Case 사용
        
        ```tsx
        const example = 1;
        let example2;
        example2 = 2;
        ```
    2. 함수의 경우 동사+명사 사용
        - 예: `getInformation()`
    3. `var` 변수 선언은 지양한다.
    4. 약어는 되도록 사용하지 않는다.
        - 부득이하게 약어가 필요하다고 판단되는 경우 팀원과 상의를 거친다.


- **비동기 함수의 사용**
    1. `async`, `await` 함수 사용을 지향한다.
    2. `Promise` 사용은 지양한다.
    3. 다만 로직을 짜는 데 있어 `Promise`를 불가피하게 사용할 경우, 주석으로 표시하고 commit에 그 이유를 작성한다.

- **함수명**
    1. controller, service 함수명
        - controller와 service 함수명은 동일하다.
            - 조회 함수: `bring`
            - 수정 함수: `modify`
            - 삭제 함수: `erase`
            - 삽입 함수: `penetrate`
        - 이외 다른 함수는 상황에 맞는 명을 지정 후 함수 docs를 사용하여 명시한다.
        
        ```tsx
        // 조회 함수 가져올 데이터에 대한 타입은 dto타입으로 지정하여 이름에 붙여준다.
        public async bringUser(userId: number): Promise<User> {
        }

        // 수정할 객체를 modify 뒤에 붙여준다.
        public async modifyUser(userId: number) {
        }

        // 삭제할 객체를 erase 뒤에 붙여준다.
        public async eraseUser(userId: number) {
        }

        // 삽입할 객체를 penetrate 뒤에 붙여준다.
        public async penetrateUser(userId: number) {
        }

        // 이외 다른 종류의 함수 예시
        public async login(user: User) {
        }
        ```
    2. 데이터베이스 접근 함수
        - Repository, Dao 함수
            - 조회, 업데이트, 삭제, 삽입 시
                - 맨 앞에 `find`, `update`, `delete`, `insert`를 붙인다.
                - 같은 테이블 조건 시 마지막에 `By`를 붙인다.
                - 다른 테이블의 대한 조건 시 마지막에 `With`를 붙인다.

- **클래스명**
    1. 해당 클래스명은 맨 앞에 대문자를 사용한다.
    2. (사용하려는 기능명 + 상위 패키지명)을 사용한다.


## 🔗 ERD(기획성에 따라 변동)

---
![Writon(v2)](https://github.com/user-attachments/assets/00ced521-951f-4b34-b100-a62217434f92)



## ♻ CI/CD

---
![hangmancicd drawio](https://github.com/new-writon/Writon-Be/assets/106163272/341ed4ee-8d58-4be4-9c9a-6e229977a4a0)


## ⚙️ System Architecture

---

![writon system architecture drawio (7)](https://github.com/new-writon/Writon-Be/assets/106163272/4b585cf9-885b-44b5-9df7-fbf5a84d40ab)




## 📐 트러블 슈팅(Trouble Shooting)

---

 1. Node.js 동시성 문제</br>
 참고 : https://www.notion.so/Node-js-16b0eb8d61614dfb9bafcbb5eb52317a

## 💾 응용 프로그램

---

<img width="502" alt="KakaoTalk_20240630_020448483" src="https://github.com/new-writon/Writon-Be/assets/106163272/4bff4e61-5506-4c2b-b8dc-acf403c3efb1">

- 초대장 발급을 위한 프로그램
- 조직의 챌린지에 따라 초대장을 발급할 수 있음.
- 텍스트, 엑셀 파일을 통해 한 번에 초대장 발급 가능

Code : [Repository](https://github.com/new-writon/program)




<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
