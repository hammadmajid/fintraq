# Fintraq

A modern finance tracking app built with Next.js, Vercel Postgres, and shadcn/ui.

## Features

- [x] **User Authentication**: Secure sign-up and login functionality.
- [ ] **Dashboard**: Get a quick glance at your finances with informative charts.
- [x] **Multiple Accounts**: Track your expenses across multiple accounts.
- [x] **Track Expenses**: Easily log and categorize your expenses.
- [x] **Responsive Design**: Optimized for both desktop and mobile use.
- [ ] **Reports**: Generate PDF of your finances to share with others.

## Local Development

To install the required dependencies, run:

```bash
pnpm i --frozen
```

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

Before running the application, make sure to set up the environment variables in a `.env.local` file:

```
POSTGRES_URL="************"
POSTGRES_PRISMA_URL="************"
POSTGRES_URL_NO_SSL="************"
POSTGRES_URL_NON_POOLING="************"
POSTGRES_USER="************"
POSTGRES_HOST="************"
POSTGRES_PASSWORD="************"
POSTGRES_DATABASE="************"
NEXT_PUBLIC_API_URL="" # use localhost:3000 in local development and production URL when deployed
```

## Contributing

Contributions are welcome! Please check out the existing [issues](https://github.com/hammadmajid/fintraq/issues) to see what you can help with.

## License

This project is licensed under the MIT License.
