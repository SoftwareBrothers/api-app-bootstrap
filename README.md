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

## Deployment

Application can be deployed on Kubernetes by using [Codeship](codeship.io) as a Continuous Delivery system. There is a separate documentation which can be found here: [kubernetes deployment](infrastructure/k8s/README.md) where you can find information on how to set this up.

## License

AdminBro is Copyright © 2018 SoftwareBrothers.co. It is free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE.md) file.

## About SoftwareBrothers.co

<img src="https://softwarebrothers.co/assets/images/software-brothers-logo-full.svg" width=240>

We’re an open, friendly team that helps clients from all over the world to transform their businesses and create astonishing products.

* We are available for [hire](https://softwarebrothers.co/contact).
* If you want to work for us - checkout the [career page](https://softwarebrothers.co/career).