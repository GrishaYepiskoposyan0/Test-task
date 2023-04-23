# Test Task by Grisha Yepiskoposyan

## Description

Simple Sign In and Sign Up API.  

There is an integrated Open API(Swagger).
Endpoint for swagger: http://localhost:3000/api  

All DTOs(Data Transfer Object) are validated:  
**SignInDto** is validated for _`email`_ field  
**SignUpDto** is validated for `email` and `phoneNumber` fields

Application currently has 3 endpoints: `sign-in`, `sign-up`, and `get-me`.  
We can get user information by sending **_`Get`_** request to `get-me` endpoint sending **jwt auth bearer** token by request headers.
## Prerequisites

- Node.js, npm and Docker installed on your local machine

## How to start application?

1. Install dependencies:

```sh
npm install
```

2. Run _**docker-compose.yml**_ file to run **Postgres** container:

```sh
docker-compose up -d
```

3. Run database migrations to create necessary table(s)

```sh
npm run migrate
```

4. Run application:

```sh
npm start
```
or for dev mode
```sh
npm run start:dev
```
