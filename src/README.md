# Avannis Data Sync - UI

Built with [React](https://reactjs.org/)

## Prerequisites

* Install [npm](https://docs.npmjs.com/)

## App Logic/Configuration/Documentation

A breakdown of the UI logic and configuration can be found at https://drive.google.com/drive/folders/19JFJYX1QWqOQ5XL7VkjnfuToSEnN8bsn?usp=sharing

## Setup

```
$ npm install
$ npm start
```

## Updates to/from backend

```
# If there was an update in AppSync run
$ amplify codegen

# If there was an update to UI connections to backend run
$ amplify push

# If there was an update to backend config run 
$ amplify pull
```

## Test

Uses Jest

https://jestjs.io/docs/en/getting-started

```
# Run tests with current snapshots
$ npm test

# Run tests in watch mode
$ npm run test:watch
```

## Deployments

Merge changes to the `master` branch and run  `amplify publish` to trigger an AWS CodePipeline 
process to build the app and deploy it to https://dev.d296doj5ygv5zw.amplifyapp.com/.
