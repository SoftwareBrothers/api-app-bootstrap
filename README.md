# APP-BOOTSTRAP

## What is this app about?

The app has following features:

- automated tests using mocha, chai and sinon,
- measured test coverage,
- database configuration,
- eslint linter configuration,
- API documentation generator using swagger,
- authentication routes and auth logic with JWT

Using this repo as a start for new app should save you couple of days of development.

## Folders structure

Application contains following folders:

- ./config - all server configuration files.
- ./infrastructure - files related to docker and docker-compose
- ./spec/index.js - test suite configuration
- ./spec/factories - factories used for tests to create object for current model
- ./src - source code for the application
- ./src/controllers - controllers
- ./src/models - mongoose models with schemas
- ./src/routes - api routes

## Automated tests with coverage

As mentioned above application uses mocha along with chai.expect syntax. All tests are placed inline directory with tested file. Under `./spec/index.js` you can find all the configuration for the test suit and under `./mocha.opts` options for mocha runner.

To run tests:
```
# simply run automated tests
yarn test

# or get coverage report
yarn run cover
```

## Database

Application uses mongodb as a persistent data store. ORM is mongoose.

MongoDB container is configured under `./infrastructure/docker-compose.yml`.

Simple configuration file for the database can be found here: `./config/database.js`

## Linter

Project has eslint configuration file under `./eslintrc.js`. To run linter against all the files you can use dedicated npm command:

```
# within the container
yarn run lint
```

## Swagger API docs

After running the app generated documentation is available under `http://localhost:8080/documentation`. To document new routes take a look hapi-swagger pacakge: https://github.com/glennjones/hapi-swagger or check any existing routes.
