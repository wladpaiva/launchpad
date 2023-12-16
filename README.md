# ⛴️ Turboship starter

This is an official starter Turboship.

## Getting Started

To run this project you need to have [Bun.sh](https://bun.sh) installed. Then
you can run the following command to setup the project:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/design-system`: a stub React component library shared by both `web` and
  `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next`
  and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
bun build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
bun dev
```

### Formatting code

The code has already an opinionated code style. You can change it by editing
`.prettierrc`. To format the entire codebase manually, run the following
command:

```bash
bun format
```

If you use VSCode, we recommend installing the Prettier extension. This will
allow the your code editor to format every time you save the file.

### Remote Caching

Turborepo can use a technique known as
[Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to
share cache artifacts across machines, enabling you to share build caches with
your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need
an account with Vercel. If you don't have an account you can
[create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your
[Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following
command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
