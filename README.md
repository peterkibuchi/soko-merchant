# Soko

> Soko is a powerful ecommerce platform for seamless online store management and a secure, user-friendly shopping experience.

## Table of Contents

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Meta-Features](#meta-features)
- [Quickstart](#quickstart)
- [Project Status](#project-status)

## General Information

- Soko is an ecommerce platform that allows users to seamlessly create and manage an online store, and to provide shoppers with a secure and convenient buying experience.
- It comprises two applications:

1. An [merchant](https://github.com/peterkibuchi/soko-merchant) web application for store and product management.
2. A [consumer](https://github.com/peterkibuchi/soko-consumer) web application for browsing and purchasing various products.

## Technologies Used

- React 18
- Next.js 14
- Clerk Auth
- Drizzle ORM
- Shadcn UI
- Tailwind CSS
- TypeScript
- tRPC

## Meta-Features

- Next.js `/app` dir
- React Client and Server Components
- Metadata configuration for improved SEO and web shareability
- Data fetching and mutation with Tanstack React Query
- Schema declarations and validations with Zod
- Typesafe code and best practices made possible by TypeScript, ESLint and Prettier
- Automated `format`, `lint` and `typecheck` CI steps with GitHub Actions
- ... and much more

## Quickstart

To run it locally, follow the steps below:

1. Clone repository and install the dependencies:

   ```bash
   # Clone repository
   git clone git@github.com:peterkibuchi/soko-merchant.git

   # Install dependencies
   pnpm i
   ```

2. Copy `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

3. Sync the Drizzle schema with your database

   ```bash
   pnpm db:push
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

## Project Status

Soko is currently: _in development_.
