# Soko

> Soko is a powerful ecommerce platform for seamless online store management and a secure, user-friendly shopping experience.

## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [Quickstart](#quickstart)
- [Project Status](#project-status)

## Description

- Soko is an ecommerce platform that allows users to seamlessly create and manage an online store, and to provide shoppers with a secure and convenient buying experience.

- It comprises two applications:

1. An "admin" web application for store and product management.
2. A "consumer" web application for browsing and purchasing various products.

## Project Structure

This project is based on the [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) template repository, a monorepo built off the [T3 Stack](https://create.t3.gg).

It uses [Turborepo](https://turbo.build/repo) and contains:

```text
.github
  └─ workflows
      └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v10 router definition
  └─ db
      └─ Typesafe db calls with Drizzle & Planetscale
tooling
  ├─ eslint
  |   └─ Shared, fine-grained, ESLint presets
  ├─ prettier
  |   └─ Shared Prettier configuration
  ├─ tailwind
  |   └─ Shared Tailwind configuration
  └─ typescript
      └─ Shared tsconfig you can extend from
```

## Quickstart

To get it running, follow the steps below:

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push

# Run the development server
pnpm dev
```

## Project Status

Soko is currently: _in development_.
