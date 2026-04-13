# Developer Onboarding

## First day setup

1. Clone the repo: `git clone git@github.com:acme/platform.git`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in local values
4. Start infrastructure: `docker compose up -d` (PostgreSQL + Redis)
5. Run migrations: `npx prisma migrate dev`
6. Seed the database: `npm run seed`
7. Start the server: `npm run dev`

## Running tests

```bash
npm test              # Unit tests
npm run test:e2e      # End-to-end (needs running server)
npm run test:coverage # With coverage report
```

## Code style

- ESLint + Prettier (runs on pre-commit hook)
- TypeScript strict mode
- No `any` types — use `unknown` and narrow
- Prefer named exports over default exports

## PR process

- Branch from `develop`
- PR title format: `[DOMAIN] Short description` (e.g., `[Orders] Add coupon validation`)
- At least one approval required
- CI must pass (tests, lint, type-check)
- Squash merge to `develop`

## Who to ask

- **Architecture questions:** @sarah
- **Database/Prisma:** @mike
- **DevOps/Deploy:** @jen
- **Product questions:** #product-eng Slack channel
