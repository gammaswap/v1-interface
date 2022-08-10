# Local Development

## Install Dependencies

Install the necessary packages by using the command after you have installed yarn:

`yarn`

## Run the project

`yarn dev`

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
# or
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

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
