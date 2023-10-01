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

Car parking API built with [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

## .env example

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=car-parking
DB_USERNAME=admin
DB_PASSWORD=password
DB_ROOT_PASSWORD=password
JWT_KEY=some_key
TOKEN_EXPIRATION=600s
```


## Docker Database

```bash
# Start database container
$ docker compose up -d

# Stop database container
$ docker compose down
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```


## API Documentation

All requests are sent from `Body` tab `row` selected and `JSON`

#### Users

###### Registration (POST)

```
http://localhost:3000/api/users/register
```

Admin user

```json
{
    "username": "Admin",
    "password": "Test!234",
    "passwordConfirm": "Test!234",
    "role": "admin"
}
```

Normal user

```json
{
    "username": "JohnDoe",
    "password": "Test!234",
    "passwordConfirm": "Test!234",
    "role": "user"
}
```

###### Authentication (POST)

```
http://localhost:3000/api/users/auth
```

```json
{
    "username": "JohnDoe",
    "password": "Test!234",
}
```

###### Forgot Password (POST)

```
http://localhost:3000/api/users/forgot-password
```

```json
{
    "username": "JohnDoe",
    "password": "Test!2345",
    "passwordConfirm": "Test!2345"
}
```

Every Request from this point requires `Bearer Token` to be set in `Authorization` tab. You can copy the token from the response of `Authentication` request

#### Cars

Every endpoint here is only accessible for normal(`user`) user

###### Create (POST)

```
http://localhost:3000/api/cars
```

```json
{
    "title": "BMW",
    "stateID": "ASGR-21412",
    "type": "Sedan",
}
```

###### Get all cars for the user (GET)

```
http://localhost:3000/api/cars
```

###### Get individual car for the user (GET)

```
http://localhost:3000/api/cars/:id
```


###### Update (PATCH) All values are optional

```
http://localhost:3000/api/cars/:id
```

```json
{
    "title": "Porsche",
    "stateID": "AAAA-21412",
    "type": "SUV",
}
```

###### Delete individual car for the user (DELETE)

```
http://localhost:3000/api/cars/:id
```

#### Parking Zones

Every endpoint here is only accessible for admin user

###### Create (POST)

```
http://localhost:3000/api/parking-zones
```

```json
{
    "title": "Zone 1",
    "address": "Address 1",
    "price": 10
}
```

###### Get all Parking zones (GET)

```
http://localhost:3000/api/parking-zones
```


###### Update (PATCH) All values are optional

```
http://localhost:3000/api/parking-zones/:id
```

```json
{
    "title": "Zone 22",
    "address": "Address 2",
    "price": 20
}
```

###### Delete Parking zone (DELETE)

```
http://localhost:3000/api/parking-zones/:id
```

#### Parking

Every endpoint here is only accessible for normal(`user`) user.\
This endpoint tracks active parkings, as well as history of parkings


###### Start the parking (POST)

```
http://localhost:3000/api/parking/start
```

```json
{
    "carID": 1,
    "parkingZoneID": 1,
}
```

###### Stop the parking (POST)

orderID will appear in the response, once you start the parking

```
http://localhost:3000/api/parking/stop/:orderID
```

###### Get all Parking History(with active parkings) (GET)

```
http://localhost:3000/api/parking
```

`status` is optional, if you want to specify what kind of parking history you want to get:

- `active` - _Still on the parking_
- `expired` - _Parking was finished_
- `rejected` - _Payment was rejected due to insufficient balance_

```json
{
    "status": "active" | "expired" | "rejected"
}
```