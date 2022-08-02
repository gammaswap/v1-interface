# How to start the project

Make sure [node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are installed on your computer.

## Setup

Use npm to install yarn by using the command:

```bash
npm install --global yarn
```

Install the necessary packages by using the command after you have installed yarn:
```bash
yarn install
```

Check whether Tailwindcss is installed by running the following:

```bash
npm info tailwindcss version
```

Otherwise, run the command to install Tailwindcss manually:

```bash
npm install -D tailwindcss
```


## Run the project

Run the project in your browser by using the command:

```bash
yarn run dev
```

If you receive an error about GitHub permission being denied, delete the file 'yarn-lock.json', then run the command again:

```bash
yarn run dev
```
