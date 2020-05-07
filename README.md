# Url Shortener :link:

[![code style](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Landing page that generates a functional, shortened link based on an input of a URL.

This application made with [React.js][] and [Express.js][] is designed to work with [mongoDB](https://www.mongodb.com/) databases.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Config](#config)
- [Usage](#usage)
  - [Run a local server](#run-a-local-server)
  - [Run on development mode](#run-on-development-mode)
  - [Testing](#testing)
- [Deploy to heroku](#deploy-to-heroku)

## Features

- Transformation of an url of any length into short link.
- Validator able to indicate if the generated link is actually working.
- The application keeps an url access count and shows a top five ranking of the most accesses links.

Working example: https://sr-url-shortener.herokuapp.com/

## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Clone the repository:

```bash
git clone https://github.com/santiagorodriguez24/url-shortener.git
```

Install dependencies:

```sh
npm install
```

## Config

Put your database values into the `config.js` file found in the `server/config/` sub-directory.

**config.js:**

```js
process.env.PORT = process.env.PORT || 5000;

process.env.NODE_ENV = process.env.NODE_ENV || "development";

let urlDB;

if (process.env.NODE_ENV === "development") {
  urlDB = "mongodb://localhost:27017/url-shortener"; // Edit with your database url.
} else {
  urlDB = process.env.mongo_database_url;
}

process.env.URLDB = urlDB;
```

Create the ".env.local" and ".env.production.local" files in the `client/` sub-directory as follows:

**.env.local:**

```bash
REACT_APP_API_URL=http://localhost:3001
```

**.env.production.local:**

```bash
REACT_APP_API_URL=http://localhost:3001
```

More info on [create-react-app](https://create-react-app.dev/docs/adding-custom-environment-variables/).


## Usage

### Run a local server

The built version of the react client is served from the express server.

On root directory

```bash
npm run local-start
```

### Run on development mode

The client runs on a webpack server and makes requests to the local server through a proxy.

On root directory

```bash
npm run dev
```


## Deploy to heroku

Before deploy:

- Create a [MongoDB Atlas](https://www.mongodb.com/) account.
- Build a cluster.
- Create a database in the cluster.
- Create a user for the database.

```bash
git clone https://github.com/santiagorodriguez24/url-shortener.git
cd url-shortener/
heroku create
heroku config:set mongo_database_url="mongodb+srv://<username>:<password>@cluster0-xp3lv.mongodb.net/collectionname"
```

Edit the ".env.production" file of the `client/` sub-directory with your heroku app url:

**.env.production:**

```bash
REACT_APP_API_URL=https://sr-url-shortener.herokuapp.com
```

Commit your changes and push to heroku:

```bash
git commit -am "change enviroment"
git push heroku master
heroku config:set mongo_database_url="mongodb+srv://<username>:<password>@cluster0-xp3lv.mongodb.net/collectionname"
```

This deployment will:

- Detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
- Build the app with
  - `npm install` for the Node server.
  - `npm install` && `npm run build` for the React Client
- Connect to the cloud database.


## Versions

- [1.0.0](https://github.com/santiagorodriguez24/url-shortener/releases/tag/v1.0.0):
  - First functional version of the application.

##

[npm]: https://www.npmjs.com/
[react.js]: https://reactjs.org/
[express.js]: https://expressjs.com/
