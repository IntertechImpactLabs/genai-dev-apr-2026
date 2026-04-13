# Architecture Overview

## Stack

- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js 4.x
- **Database:** PostgreSQL 16 with Prisma ORM
- **Cache:** Redis 7 for session storage and rate limiting
- **Queue:** BullMQ for background job processing

## Service boundaries

The application follows a modular monolith pattern with three domains:

- **Users** — authentication, profiles, roles
- **Orders** — cart, checkout, payment integration
- **Catalog** — products, categories, inventory

Each domain has its own route file, service layer, and repository. Cross-domain communication goes through the service layer, never direct repository access.

## Database conventions

- All tables use UUID primary keys
- Timestamps: `created_at`, `updated_at` (auto-managed by Prisma)
- Soft deletes via `deleted_at` column (null = active)
- Migrations run automatically on deploy

## API conventions

- REST endpoints under `/api/v1/`
- Authentication via Bearer JWT tokens
- Rate limiting: 100 req/min per user, 1000 req/min per API key
- Error responses follow RFC 7807 Problem Details format
