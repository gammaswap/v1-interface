# Local Development

## Install Dependencies

Install the necessary packages by using the command after you have installed yarn:

`yarn`

## Run the project

`yarn dev`

If you receive an error about GitHub permission being denied, delete the file 'yarn-lock.json', then run the command again.

## Setup environment variables

Next.js comes with built in support for environment variables. This enables to do the following

- use `.env.local` to load environment variables
- Expose environment variables to the browser by prefixing with `NEXT_PUBLIC_`

> **NOTE:** If you did not use `NEXT_PUBLIC_` keyword as a prefix for your environment variable you will not be able to access the variable on frontend.

Create .env.local, .env.development and .env.production files. Add the environment variables in these files. For Example:

> NEXT_PUBLIC_ROPSTEN_API_KEY = MY_API_KEY

Now when the server runs Next.js will add the variable `NEXT_PUBLIC_ROPSTEN_API_KEY` in `process.env`. We can access this variable by using `process.env.NEXT_PUBLIC_ROPSTEN_API_KEY`.

`.env.local` file will always override the default set. So, if you want to run the `.env.development` or `.env.production` file then `.env.local` should be removed from the project otherwise development or production file will be overridden by local file.

Run `next dev` to load development environment variables and `next start` to load production environment variables
