# Fintraq

A modern finance tracking app built with Next.js, Neon, and shadcn/ui.

## Features

- [x] **User Authentication**: Secure sign-up and login functionality.
- [x] **Dashboard**: Get a quick glance at your finances with informative charts.
- [x] **Multiple Accounts**: Track your expenses across multiple accounts.
- [x] **Track Expenses**: Easily log and categorize your expenses.
- [ ] **Responsive Design**: Optimized for both desktop and mobile use.
- [ ] **Manage Budgets**: Keep your expenses under control.
- [ ] **Manage Loans**: Track the loans you owe or borrowed.
- [ ] **Reports**: Generate PDF of your finances to share with others.

## Local Development

To install the required dependencies, run:

```bash
pnpm i --frozen-lockfile
```

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

Before running the application, make sure to set up the environment variables in a `.env` file:

```env
AUTH_SECRET="************"
AUTH_GITHUB_ID="************"
AUTH_GITHUB_SECRET="************"
AUTH_DRIZZLE_URL="************" # same as DATABASE_URL
BLOB_READ_WRITE_TOKEN="************"
DATABASE_URL="************"
DATABASE_URL_UNPOOLED="************"
RESEND_API_KEY="***************"
```

## Contributing

Contributions are welcome! Please check out the existing [issues](https://github.com/hammadmajid/fintraq/issues) to see what you can help with.

## License

This project is licensed under the MIT License.
