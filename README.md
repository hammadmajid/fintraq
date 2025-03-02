# Fintraq

A modern finance tracking app built with Next.js, Neon, and shadcn/ui.

## Features

- [x] **User Authentication**: Secure sign-up and login functionality.
- [x] **Dashboard**: Get a quick glance at your finances with informative charts.
- [x] **Multiple Accounts**: Track your expenses across multiple accounts.
- [x] **Track Expenses**: Easily log and categorize your expenses.
- [x] **Responsive Design**: Optimized for both desktop and mobile use.
- [x] **Manage Budgets**: Keep your expenses under control.
- [ ] **Reports**: Generate PDF of your finances to share with others.

## Local Development

To install the required dependencies, run:

```bash
pnpm i --frozen-lockfile
```

To run the development server:

```bash
pnpm dev --experimental-https
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## Configuration

Before running the application, make sure to set up the environment variables in a `.env` file:

```env
# See https://authjs.dev/
AUTH_SECRET="************"
AUTH_GITHUB_ID="************"
AUTH_GITHUB_SECRET="************"
AUTH_GOOGLE_ID="************"
AUTH_GOOGLE_SECRET="************"
AUTH_DRIZZLE_URL="************" # same as DATABASE_URL

# See https://vercel.com/docs/storage/vercel-blob
BLOB_READ_WRITE_TOKEN="************"

# Postgres database connection string
DATABASE_URL="************"
DATABASE_URL_UNPOOLED="************"

# See https://resend.com/docs/
RESEND_API_KEY="***************"
```

## Contributing

Contributions are welcome! Please check out the existing [issues](https://github.com/hammadmajid/fintraq/issues) to see what you can help with.

## License

This project is licensed under the MIT License.
